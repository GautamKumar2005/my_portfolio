import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language_id, source_code, stdin } = await req.json();

    const apiKey = process.env.RAPIDAPI_JUDGE0_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "API key is missing on the server. Please add RAPIDAPI_JUDGE0_KEY to environment variables." },
        { status: 500 }
      );
    }

    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id,
        source_code,
        stdin,
      }),
    });

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {
      return NextResponse.json(
        { message: "Invalid or unauthorized RapidAPI Key." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Execution error:", error);
    return NextResponse.json(
      { message: "Internal server error while executing code." },
      { status: 500 }
    );
  }
}
