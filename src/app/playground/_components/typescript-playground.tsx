/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import { Button } from "@/app/_components/ui/button";
import { Tabs, TabsContent } from "@/app/_components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  Play,
  Download,
  Copy,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import PlayGroundCard from "./playground-card";
import { codeLinkBase } from "@/app/global";
import { toast } from "@/app/_hooks/use-toast";

const DEFAULT_TS_CODE = `// Welcome to the TypeScript Playground!

// Type annotations
function greeter(person: string) {
  return "Hello, " + person;
}

// Interface example
interface Person {
  firstName: string;
  lastName: string;
}

// Using the interface
function greetPerson(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

// Class example
class Student {
  fullName: string;
  
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

// Create a new student
const user = new Student("Jane", "M.", "User");

// Log some results
console.log(greeter("TypeScript User"));
console.log(greetPerson({ firstName: "John", lastName: "Doe" }));
console.log("Student:", user);
`;

export default function TypescriptPlayground({
  inline = false,
}: {
  inline?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(!inline);
  const [tsCode, setTsCode] = useState(DEFAULT_TS_CODE);
  const [jsCode, setJsCode] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("typescript");
  const [isCompiling, setIsCompiling] = useState(false);
  const [tsLoaded, setTsLoaded] = useState(false);
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const tsRef = useRef<any>(null);

  useEffect(() => {
    const loadTypeScript = async () => {
      try {
        const ts = await import("typescript");
        tsRef.current = ts;
        setTsLoaded(true);
      } catch (error) {
        console.error("Failed to load TypeScript:", error);
        setOutput("Error: Failed to load TypeScript compiler");
      }
    };

    loadTypeScript();
  }, []);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: false,
      lib: ["es2015", "dom"],
      strict: true,
    });
  };

  const compileTypeScript = () => {
    if (!tsLoaded || !tsRef.current) {
      setOutput("TypeScript compiler is not loaded yet. Please wait...");
      return;
    }

    setIsCompiling(true);
    setOutput("");

    try {
      const ts = tsRef.current;

      const result = ts.transpileModule(tsCode, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2015,
          strict: true,
          noImplicitAny: true,
          removeComments: true,
        },
      });

      setJsCode(result.outputText);

      executeJavaScript(result.outputText);
    } catch (error) {
      console.error("Compilation error:", error);
      setOutput(
        `Compilation error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsCompiling(false);
    }
  };

  const executeJavaScript = (code: string) => {
    const logs: string[] = [];
    const captureConsole = {
      log: (...args: any[]) => {
        logs.push(
          args
            .map((arg) => {
              if (typeof arg === "object") {
                try {
                  return JSON.stringify(arg, null, 2);
                } catch {
                  return String(arg);
                }
              }
              return String(arg);
            })
            .join(" ")
        );
      },
      error: (...args: any[]) => {
        logs.push(`ERROR: ${args.map(String).join(" ")}`);
      },
      warn: (...args: any[]) => {
        logs.push(`WARNING: ${args.map(String).join(" ")}`);
      },
      info: (...args: any[]) => {
        logs.push(`INFO: ${args.map(String).join(" ")}`);
      },
    };

    try {
      const executeCode = new Function("console", code);
      executeCode(captureConsole);
      setOutput(logs.join("\n"));
    } catch (error) {
      console.error("Execution error:", error);
      setOutput(
        `Execution error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const resetPlayground = () => {
    setTsCode(DEFAULT_TS_CODE);
    setJsCode("");
    setOutput("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Success",
          description: "Copied to clipboard",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Copy failed",
          description: "Failed to copy to clipboard. Please try again.",
          variant: "destructive",
        });
      });
  };

  const downloadCode = (code: string, fileType: string) => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileType === "typescript" ? "code.ts" : "code.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleResize = () => {
      // Force re-render to update editor size
      setActiveTab((prev) =>
        prev === "typescript" ? "typescript" : "javascript"
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="typescript-playground">
      <PlayGroundCard
        title="TypeScript Playground"
        description="Write, compile, and run TypeScript code directly in your browser"
        footerText="Crazy that we be tellin computers what to do like that"
        codeUrl={`${codeLinkBase}/src/app/playground/_components/typescript-playground.tsx`}
        navUrl={`/playground${inline ? "/" : "#"}typescript-playground`}
        inline={inline}
      >
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                Goodbye, world
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Hello, world
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          {isExpanded && (
            <div>
              <div className="flex flex-col-reverse sm:flex-row gap-1 p-1 w-full justify-between ">
                <div
                  role="tablist"
                  aria-orientation="horizontal"
                  className="inline-flex w-fit h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
                  data-orientation="horizontal"
                  style={{ outline: "none" }}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "typescript"}
                    aria-controls="radix-:r1:-content-typescript"
                    data-state={
                      activeTab === "typescript" ? "active" : "inactive"
                    }
                    id="radix-:r1:-trigger-typescript"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                    // tabindex="-1"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    onClick={() => setActiveTab("typescript")}
                  >
                    TypeScript
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "javascript"}
                    aria-controls="radix-:r1:-content-javascript"
                    data-state={
                      activeTab === "javascript" ? "active" : "inactive"
                    }
                    id="radix-:r1:-trigger-javascript"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                    // tabindex="-1"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    onClick={() => setActiveTab("javascript")}
                  >
                    JavaScript
                  </button>
                </div>
                <div className="flex gap-2 items-center">
                  <Select value={editorTheme} onValueChange={setEditorTheme}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vs-dark">Dark</SelectItem>
                      <SelectItem value="vs-light">Light</SelectItem>
                      <SelectItem value="hc-black">High Contrast</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(
                        activeTab === "typescript" ? tsCode : jsCode
                      )
                    }
                    title="Copy code"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      downloadCode(
                        activeTab === "typescript" ? tsCode : jsCode,
                        activeTab
                      )
                    }
                    title="Download code"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={resetPlayground}
                    title="Reset playground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row flex-1 ">
                  {/* Editor Section */}
                  <div className="flex flex-col w-full md:w-1/2 border-r">
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="flex flex-col h-full w-full"
                    >
                      <TabsContent
                        value="typescript"
                        className="flex-1 overflow-hidden border-t"
                      >
                        <div className="h-full w-full overflow-hidden">
                          <Editor
                            // height="calc(100vh - 180px)"
                            className="min-h-[500px]"
                            defaultLanguage="typescript"
                            value={tsCode}
                            onChange={(value) => setTsCode(value || "")}
                            theme={editorTheme}
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              wordWrap: "on",
                              tabSize: 2,
                              scrollBeyondLastLine: false,
                            }}
                            onMount={handleEditorDidMount}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent
                        value="javascript"
                        className="flex-1 overflow-hidden border-t"
                      >
                        <div className="h-full w-full overflow-hidden">
                          <Editor
                            height="calc(100vh - 180px)"
                            className="min-h-[300px]"
                            defaultLanguage="javascript"
                            value={jsCode}
                            theme={editorTheme}
                            options={{
                              readOnly: true,
                              minimap: { enabled: false },
                              fontSize: 14,
                              wordWrap: "on",
                              tabSize: 2,
                              scrollBeyondLastLine: false,
                            }}
                          />
                        </div>
                      </TabsContent>

                      <div className="border-t bg-background">
                        <Button
                          onClick={compileTypeScript}
                          disabled={isCompiling || !tsLoaded}
                          className="w-full"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {isCompiling ? "Compiling..." : "Run Code"}
                        </Button>
                      </div>
                    </Tabs>
                  </div>

                  {/* Output Section */}
                  <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex-1 p-4 overflow-auto bg-black">
                      <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                        {output || "// Run your code to see the output here"}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </PlayGroundCard>
    </section>
  );
}
