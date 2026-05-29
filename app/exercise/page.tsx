"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Editor from "@monaco-editor/react";
import { Play, Loader2, Code, TerminalSquare } from "lucide-react";

const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  cpp: "10.2.0",
  c: "10.2.0",
  java: "15.0.2",
  javascript: "18.15.0",
  typescript: "5.0.3",
};

const CODE_SNIPPETS = {
  python: `print("Hello from Python!")\n# Try inputting a name in the stdin box:\n# name = input()\n# print("Hello, " + name)`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    return 0;\n}`,
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}`,
  javascript: `console.log("Hello from JavaScript!");`,
  typescript: `let message: string = "Hello from TypeScript!";\nconsole.log(message);`,
};

type Language = keyof typeof LANGUAGE_VERSIONS;

export default function ExercisePage() {
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState(CODE_SNIPPETS["python"]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customApiUrl, setCustomApiUrl] = useState("https://emkc.org/api/v2/piston/execute");

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(CODE_SNIPPETS[lang]);
    setOutput("");
  };

  const runCode = async () => {
    if (!code) return;
    setIsLoading(true);
    setOutput("");

    // Local Execution for JavaScript
    if (language === "javascript") {
      try {
        const originalConsoleLog = console.log;
        let logs: string[] = [];
        console.log = (...args) => {
          logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };
        
        // Execute code
        const executionResult = new Function(code)();
        if (executionResult !== undefined) {
          logs.push(String(executionResult));
        }
        
        console.log = originalConsoleLog;
        setOutput(logs.join('\n') || "Executed successfully without output.");
      } catch (error: any) {
        setOutput("Runtime Error: " + error.message);
      }
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(customApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          version: LANGUAGE_VERSIONS[language],
          files: [
            {
              content: code,
            },
          ],
          stdin: input,
        }),
      });

      const result = await response.json();
      
      if (result.message && result.message.includes("whitelist")) {
        setOutput(
          `API Error: ${result.message}\n\n` + 
          `The public Piston API now requires authorization. To run languages like Python/C++/Java, you need to self-host Piston (or use an alternative) and provide your URL in the configuration below.`
        );
      } else if (result.run) {
        setOutput(result.run.output || (result.run.stderr ? "Error: " + result.run.stderr : "No output generated."));
      } else {
        setOutput(result.message || "Execution failed.");
      }
    } catch (error) {
      setOutput("Network Error: Failed to execute code. Ensure your Piston API URL is correct and the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-white flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">Interactive Compiler</h1>
          <p className="text-slate-400">Write, run, and test code instantly across multiple programming languages.</p>
          
          {/* API Configuration */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-cyan-500/20 max-w-2xl">
            <span className="text-sm font-medium text-slate-300 whitespace-nowrap">API URL:</span>
            <input 
              type="text" 
              value={customApiUrl}
              onChange={(e) => setCustomApiUrl(e.target.value)}
              placeholder="e.g. https://emkc.org/api/v2/piston/execute"
              className="flex-1 w-full bg-slate-950 border border-cyan-500/30 rounded px-3 py-1.5 text-sm text-cyan-100 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <a 
              href="https://github.com/engineer-man/piston" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 underline whitespace-nowrap"
            >
              How to self-host Piston?
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 flex-1 lg:h-[600px]">
          {/* Left Panel: Editor */}
          <div className="flex-1 flex flex-col glass rounded-xl border border-cyan-500/30 overflow-hidden min-h-[400px]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/30 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className="bg-transparent text-sm font-semibold text-cyan-300 focus:outline-none cursor-pointer"
                >
                  <option value="python" className="bg-slate-900 text-slate-200">Python</option>
                  <option value="cpp" className="bg-slate-900 text-slate-200">C++</option>
                  <option value="c" className="bg-slate-900 text-slate-200">C</option>
                  <option value="java" className="bg-slate-900 text-slate-200">Java</option>
                  <option value="javascript" className="bg-slate-900 text-slate-200">JavaScript</option>
                  <option value="typescript" className="bg-slate-900 text-slate-200">TypeScript</option>
                </select>
              </div>
              
              <button
                onClick={runCode}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Run Code
              </button>
            </div>
            
            <div className="flex-1 relative">
              <Editor
                height="100%"
                language={language === "c" || language === "cpp" ? "cpp" : language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "var(--font-mono)",
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                }}
              />
            </div>
          </div>

          {/* Right Panel: I/O */}
          <div className="w-full lg:w-96 flex flex-col gap-6 h-[400px] lg:h-auto">
            {/* Standard Input */}
            <div className="flex-1 flex flex-col glass rounded-xl border border-cyan-500/30 overflow-hidden min-h-[150px]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/30 bg-slate-900/50">
                <TerminalSquare className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-slate-300">Standard Input (stdin)</h3>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input here..."
                className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none font-mono text-sm text-slate-300"
              />
            </div>

            {/* Standard Output */}
            <div className="flex-1 flex flex-col glass rounded-xl border border-cyan-500/30 overflow-hidden min-h-[150px]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/30 bg-slate-900/50">
                <TerminalSquare className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-slate-300">Output</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-black/40">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full text-slate-500 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Executing...
                  </div>
                ) : (
                  <pre className="font-mono text-sm whitespace-pre-wrap text-slate-300">
                    {output || "Output will appear here..."}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
