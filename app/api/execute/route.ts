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

    const response = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify({
        compiler: compiler,
        code: source_code,
        stdin: stdin || "",
      }),
    });

    const data = await response.json();

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
