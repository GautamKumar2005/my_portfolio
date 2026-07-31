import { NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const TEMP_DIR = path.join(process.cwd(), "temp_runs");

interface CommandResult {
  stdout: string;
  stderr: string;
  code: number | null;
  killed: boolean;
  enoent?: boolean;
}

interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
}

async function runCommand(
  cmd: string,
  args: string[],
  inputData: string,
  cwd: string,
  timeoutMs = 5000
): Promise<CommandResult> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, shell: true });
    
    let stdout = "";
    let stderr = "";
    let killed = false;

    const timer = setTimeout(() => {
      killed = true;
      try {
        child.kill("SIGKILL");
      } catch (e) {
        console.error("Failed to kill child process:", e);
      }
    }, timeoutMs);

    if (inputData && child.stdin) {
      try {
        child.stdin.write(inputData);
        child.stdin.end();
      } catch (err) {
        console.error("Stdin write error:", err);
      }
    }

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ stdout, stderr, code, killed });
    });

    child.on("error", (err: any) => {
      clearTimeout(timer);
      resolve({ stdout, stderr: err.message, code: -1, killed: false, enoent: err.code === "ENOENT" });
    });
  });
}

function checkCommandMissing(res: CommandResult): boolean {
  return (
    !!res.enoent ||
    res.code === 9009 ||
    (!!res.stderr && res.stderr.includes("is not recognized as an internal or external command"))
  );
}

async function executeLocally(
  language_id: number,
  source_code: string,
  stdin: string
): Promise<ExecutionResult | null> {
  const runId = Math.random().toString(36).substring(7);
  const runDir = path.join(TEMP_DIR, runId);
  
  try {
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }
    fs.mkdirSync(runDir, { recursive: true });

    if (language_id === 71) {
      // Python
      const filePath = path.join(runDir, "script.py");
      fs.writeFileSync(filePath, source_code);
      const res = await runCommand("python", [path.basename(filePath)], stdin, runDir);
      if (checkCommandMissing(res)) return null;

      if (res.killed) {
        return { stdout: res.stdout, stderr: "Execution timed out (5s limit reached)", compile_output: null, message: "Execution timed out" };
      }
      return { stdout: res.stdout, stderr: res.stderr || null, compile_output: null, message: res.code !== 0 ? "Execution failed" : null };
    }

    if (language_id === 54) {
      // C++
      const filePath = path.join(runDir, "main.cpp");
      fs.writeFileSync(filePath, source_code);
      
      const compileRes = await runCommand("g++", ["-O3", "main.cpp", "-o", "main.exe"], "", runDir);
      if (checkCommandMissing(compileRes)) return null;

      if (compileRes.code !== 0) {
        return { stdout: null, stderr: null, compile_output: compileRes.stderr || compileRes.stdout, message: "Compilation failed" };
      }

      const runRes = await runCommand("main.exe", [], stdin, runDir);
      if (runRes.killed) {
        return { stdout: runRes.stdout, stderr: "Execution timed out (5s limit reached)", compile_output: null, message: "Execution timed out" };
      }
      return { stdout: runRes.stdout, stderr: runRes.stderr || null, compile_output: null, message: runRes.code !== 0 ? "Execution failed" : null };
    }

    if (language_id === 50) {
      // C
      const filePath = path.join(runDir, "main.c");
      fs.writeFileSync(filePath, source_code);
      
      const compileRes = await runCommand("gcc", ["-O3", "main.c", "-o", "main.exe"], "", runDir);
      if (checkCommandMissing(compileRes)) return null;

      if (compileRes.code !== 0) {
        return { stdout: null, stderr: null, compile_output: compileRes.stderr || compileRes.stdout, message: "Compilation failed" };
      }

      const runRes = await runCommand("main.exe", [], stdin, runDir);
      if (runRes.killed) {
        return { stdout: runRes.stdout, stderr: "Execution timed out (5s limit reached)", compile_output: null, message: "Execution timed out" };
      }
      return { stdout: runRes.stdout, stderr: runRes.stderr || null, compile_output: null, message: runRes.code !== 0 ? "Execution failed" : null };
    }

    if (language_id === 74) {
      // TypeScript
      const filePath = path.join(runDir, "script.ts");
      fs.writeFileSync(filePath, source_code);
      const res = await runCommand("npx", ["--yes", "tsx", "script.ts"], stdin, runDir);
      if (checkCommandMissing(res)) return null;

      if (res.killed) {
        return { stdout: res.stdout, stderr: "Execution timed out (5s limit reached)", compile_output: null, message: "Execution timed out" };
      }
      return { stdout: res.stdout, stderr: res.stderr || null, compile_output: null, message: res.code !== 0 ? "Execution failed" : null };
    }

    return null;
  } catch (err: any) {
    console.error("Local execution error:", err);
    return null;
  } finally {
    try {
      if (fs.existsSync(runDir)) {
        fs.rmSync(runDir, { recursive: true, force: true });
      }
    } catch (e) {
      console.error("Failed to clean up temp dir:", e);
    }
  }
}

export async function POST(req: Request) {
  try {
    const { language_id, source_code, stdin } = await req.json();

    // Try executing locally first if supported
    if ([71, 54, 50, 74].includes(language_id)) {
      const localResult = await executeLocally(language_id, source_code, stdin);
      if (localResult) {
        return NextResponse.json(localResult);
      }
    }

    // Mapping from our frontend language IDs (Judge0 style) to Wandbox compilers
    const WANDBOX_COMPILERS: Record<number, string> = {
      71: "cpython-3.14.0",     // Python
      54: "gcc-13.2.0",         // C++
      50: "gcc-13.2.0-c",       // C
      62: "openjdk-jdk-22+36",  // Java
      74: "typescript-5.6.2",   // TypeScript (JS runs locally, but TS goes here)
    };

    const compiler = WANDBOX_COMPILERS[language_id];
    
    if (!compiler) {
      return NextResponse.json({ message: "Unsupported language." }, { status: 400 });
    }

    let finalCode = source_code;
    // Wandbox saves Java single-file executions to `prog.java`.
    // If the user specifies `public class Main`, Java enforces the filename `Main.java`.
    // We strip the `public` modifier from the top-level class so it compiles cleanly.
    if (language_id === 62) {
      finalCode = finalCode.replace(/public\s+class\s+([a-zA-Z0-9_]+)/g, "class $1");
    }

    let data;
    let retries = 3;
    let lastError = null;

    while (retries > 0) {
      try {
        const response = await fetch("https://wandbox.org/api/compile.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
          body: JSON.stringify({
            compiler: compiler,
            code: finalCode,
            stdin: stdin || "",
          }),
        });

        data = await response.json();
        
        // Check for temporary server overload errors
        const isOverloaded = data && (
          (data.compiler_error && data.compiler_error.includes("Resource temporarily unavailable")) ||
          (data.program_error && data.program_error.includes("Resource temporarily unavailable"))
        );

        if (isOverloaded) {
          retries--;
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1500)); // wait 1.5s before retrying
            continue;
          } else {
             const overloadMsg = "The execution server is currently experiencing high load and cannot allocate resources. Please wait a few seconds and try running your code again.";
             if (data.compiler_error && data.compiler_error.includes("Resource temporarily unavailable")) {
                 data.compiler_error = overloadMsg;
             }
             if (data.program_error && data.program_error.includes("Resource temporarily unavailable")) {
                 data.program_error = overloadMsg;
             }
          }
        }
        
        break; // Success or an error we shouldn't retry
      } catch (e) {
        lastError = e;
        retries--;
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
    }

    if (!data) {
      throw lastError || new Error("Failed to reach execution API after retries");
    }

    // Map Wandbox response format back to what the frontend expects (Judge0 format)
    const result = {
      stdout: data.program_output || null,
      stderr: data.program_error || null,
      compile_output: data.compiler_error || null,
      message: data.status !== "0" ? "Execution failed" : null,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Execution error:", error);
    return NextResponse.json(
      { message: "Internal server error while executing code." },
      { status: 500 }
    );
  }
}
