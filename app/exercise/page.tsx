"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Editor from "@monaco-editor/react";
import { Play, Loader2, Code, TerminalSquare } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const LANGUAGE_IDS = {
  python: 71,
  cpp: 54,
  c: 50,
  java: 62,
  javascript: 63,
  typescript: 74,
};

const CODE_SNIPPETS = {
  python: `print("Hello from Python!")\n# Try inputting a name in the stdin box:\n# name = input()\n# print("Hello, " + name)`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    return 0;\n}`,
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello from C!\\n");\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}`,
  javascript: `console.log("Hello from JavaScript!");`,
  typescript: `let message: string = "Hello from TypeScript!";\nconsole.log(message);`,
};

type Language = keyof typeof LANGUAGE_IDS;

export default function ExercisePage() {
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState(CODE_SNIPPETS["python"]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we are on a mobile device to stack panels vertically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: LANGUAGE_IDS[language],
          source_code: code,
          stdin: input,
        }),
      });

      const result = await response.json();
      
      if (response.status !== 200) {
        setOutput(`API Error: ${result.message || 'Unknown error'}`);
      } else if (result.stdout !== null) {
        setOutput(result.stdout || "Execution finished (No Output)");
      } else if (result.stderr !== null) {
        setOutput("Error:\n" + result.stderr);
      } else if (result.compile_output !== null) {
        setOutput("Compilation Error:\n" + result.compile_output);
      } else {
        setOutput("Execution failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      setOutput("Network Error: Failed to connect to the backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  const editorContent = (
    <div className="h-full flex flex-col bg-slate-900/50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/30 bg-slate-900/80">
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
          <span className="hidden sm:inline">Run Code</span>
          <span className="sm:hidden">Run</span>
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
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );

  const inputContent = (
    <div className="h-full flex flex-col bg-slate-900/50">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/30 bg-slate-900/80">
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
  );

  const outputContent = (
    <div className="h-full flex flex-col bg-black/40">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/30 bg-slate-900/80">
        <TerminalSquare className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-slate-300">Output</h3>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
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
  );

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-white flex flex-col">
      <Header />
      
      <div className="w-full pt-16 flex flex-col min-h-[900px] lg:h-[110vh]">
        <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-col min-h-0">
          <div className="mb-4 shrink-0 flex items-end justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Interactive Compiler</h1>
              <p className="text-sm text-slate-400 mt-1">Write, run, and test code instantly.</p>
            </div>
          </div>

          {isMobile ? (
            <div className="flex-1 w-full border border-cyan-500/30 rounded-xl overflow-hidden glass flex flex-col">
              <div className="h-[500px] shrink-0">
                {editorContent}
              </div>
              <div className="h-[250px] shrink-0 border-t border-cyan-500/30">
                {inputContent}
              </div>
              <div className="h-[300px] shrink-0 border-t border-cyan-500/30">
                {outputContent}
              </div>
            </div>
          ) : (
            <div className="flex-1 w-full border border-cyan-500/30 rounded-xl overflow-hidden glass flex flex-col min-h-0">
              <PanelGroup direction="horizontal" className="h-full w-full">
                <Panel defaultSize={70} minSize={30}>
                  {editorContent}
                </Panel>
                
                <PanelResizeHandle className="w-2 bg-slate-800 hover:bg-cyan-500/50 transition-colors cursor-col-resize flex flex-col items-center justify-center">
                  <div className="h-8 w-1 bg-slate-600 rounded-full" />
                </PanelResizeHandle>
                
                <Panel defaultSize={30} minSize={10}>
                  <PanelGroup direction="vertical">
                    <Panel defaultSize={50} minSize={20}>
                      {inputContent}
                    </Panel>
                    
                    <PanelResizeHandle className="h-2 bg-slate-800 hover:bg-cyan-500/50 transition-colors cursor-row-resize flex items-center justify-center">
                      <div className="w-8 h-1 bg-slate-600 rounded-full" />
                    </PanelResizeHandle>
                    
                    <Panel defaultSize={50} minSize={20}>
                      {outputContent}
                    </Panel>
                  </PanelGroup>
                </Panel>
              </PanelGroup>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
