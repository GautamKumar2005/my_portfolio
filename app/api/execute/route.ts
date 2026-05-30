import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language_id, source_code, stdin } = await req.json();

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
