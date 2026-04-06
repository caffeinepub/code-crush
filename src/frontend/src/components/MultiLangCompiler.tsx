import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Loader2,
  Play,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  code: string;
  stdin: string;
  savedAt: string;
}

interface PistonResult {
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  language: string;
  version: string;
}

// ─── Judge0 Language IDs ───────────────────────────────────────────────────────
const JUDGE0_LANGUAGE_IDS: Record<string, number> = {
  python: 71,
  javascript: 63,
  typescript: 74,
  java: 62,
  c: 50,
  cpp: 54,
  csharp: 51,
  go: 60,
  rust: 73,
  ruby: 72,
  php: 68,
  swift: 83,
  kotlin: 78,
  r: 80,
  bash: 46,
  perl: 85,
  lua: 64,
  scala: 81,
  haskell: 61,
  elixir: 57,
};

// ─── Language Config ───────────────────────────────────────────────────────────
const LANGUAGES = [
  { id: "python", name: "Python", emoji: "🐍" },
  { id: "javascript", name: "JavaScript", emoji: "🟨" },
  { id: "typescript", name: "TypeScript", emoji: "💙" },
  { id: "java", name: "Java", emoji: "☕" },
  { id: "c", name: "C", emoji: "⚡" },
  { id: "cpp", name: "C++", emoji: "⚡" },
  { id: "csharp", name: "C#", emoji: "💜" },
  { id: "go", name: "Go", emoji: "🐹" },
  { id: "rust", name: "Rust", emoji: "🦀" },
  { id: "ruby", name: "Ruby", emoji: "💎" },
  { id: "php", name: "PHP", emoji: "🐘" },
  { id: "swift", name: "Swift", emoji: "🍎" },
  { id: "kotlin", name: "Kotlin", emoji: "🎯" },
  { id: "r", name: "R", emoji: "📊" },
  { id: "bash", name: "Bash", emoji: "💻" },
  { id: "perl", name: "Perl", emoji: "🐪" },
  { id: "lua", name: "Lua", emoji: "🌙" },
  { id: "scala", name: "Scala", emoji: "♾️" },
  { id: "haskell", name: "Haskell", emoji: "λ" },
  { id: "elixir", name: "Elixir", emoji: "💧" },
];

// ─── Starter Code ─────────────────────────────────────────────────────────────
const STARTER_CODE: Record<string, string> = {
  python:
    'print("Hello, World!")\nname = input("Enter your name: ")\nprint(f"Hello, {name}!")',
  javascript: 'const name = "World";\nconsole.log(`Hello, ${name}!`);',
  typescript: 'const name: string = "World";\nconsole.log(`Hello, ${name}!`);',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  c: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  csharp:
    'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
  ruby: 'puts "Hello, World!"',
  php: '<?php\necho "Hello, World!\\n";',
  swift: 'print("Hello, World!")',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}',
  r: 'cat("Hello, World!\\n")',
  bash: 'echo "Hello, World!"',
  perl: 'print "Hello, World!\\n";',
  lua: 'print("Hello, World!")',
  scala: 'object Main extends App {\n    println("Hello, World!")\n}',
  haskell: 'main :: IO ()\nmain = putStrLn "Hello, World!"',
  elixir: 'IO.puts "Hello, World!"',
};

// ─── Storage ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = "codeSnippets";

function loadSnippets(): CodeSnippet[] {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    ) as CodeSnippet[];
  } catch {
    return [];
  }
}

function saveSnippets(snippets: CodeSnippet[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

// ─── Language Selector ────────────────────────────────────────────────────────
function LangSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (lang: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const lang = LANGUAGES.find((l) => l.id === selected) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" data-ocid="compiler.select">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 bg-[#2a2a3e] border border-[#3a3a55] rounded-xl text-sm font-semibold text-gray-200 hover:border-violet-500 transition-colors min-w-[150px]"
      >
        <span className="text-lg">{lang.emoji}</span>
        <span className="flex-1 text-left">{lang.name}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1 z-50 w-52 bg-[#1a1a2e] border border-[#3a3a55] rounded-2xl shadow-2xl overflow-hidden"
          >
            <ScrollArea className="h-64">
              <div className="p-2">
                {LANGUAGES.map((l) => (
                  <button
                    type="button"
                    key={l.id}
                    onClick={() => {
                      onChange(l.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      l.id === selected
                        ? "bg-violet-600/40 text-violet-200"
                        : "text-gray-300 hover:bg-[#2a2a3e] hover:text-white"
                    }`}
                  >
                    <span className="text-base">{l.emoji}</span>
                    <span className="font-medium">{l.name}</span>
                    {l.id === selected && (
                      <span className="ml-auto text-[10px] text-violet-400">
                        ●
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Code Editor with Line Numbers ───────────────────────────────────────────
function CodeEditor({
  value,
  onChange,
  language,
}: {
  value: string;
  onChange: (v: string) => void;
  language: string;
}) {
  const lines = value.split("\n");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  const syncScroll = () => {
    if (textareaRef.current && lineNumRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current!;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = `${value.substring(0, start)}  ${value.substring(end)}`;
      onChange(newVal);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div
      className="flex rounded-xl overflow-hidden border border-[#3a3a55] font-mono text-sm"
      style={{ background: "#1e1e2e" }}
      data-ocid="compiler.editor"
    >
      {/* Line numbers */}
      <div
        ref={lineNumRef}
        className="select-none overflow-hidden shrink-0 text-right py-4 pl-3 pr-3 text-[#4a4a66] text-xs leading-[1.6rem]"
        style={{ background: "#181825", minWidth: "3rem" }}
        aria-hidden="true"
      >
        {lines.map((_, i) => (
          <div key={`ln-${i + 1}`}>{i + 1}</div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        data-lang={language}
        className="flex-1 bg-transparent text-gray-100 py-4 pr-4 resize-none outline-none leading-[1.6rem] text-sm"
        style={{ minHeight: "320px", maxHeight: "480px", tabSize: 2 }}
        placeholder={`// Start writing ${language} code here...`}
      />
    </div>
  );
}

// ─── Output Panel ─────────────────────────────────────────────────────────────
function OutputPanel({
  result,
  isRunning,
  runTime,
}: {
  result: PistonResult | null;
  isRunning: boolean;
  runTime: number | null;
}) {
  if (isRunning) {
    return (
      <div
        className="rounded-xl border border-[#3a3a55] p-5 flex items-center gap-3"
        style={{ background: "#0d1117" }}
        data-ocid="compiler.loading_state"
      >
        <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
        <span className="text-gray-400 text-sm">Compiling and running...</span>
      </div>
    );
  }

  if (!result) {
    return (
      <div
        className="rounded-xl border border-[#3a3a55] p-5 flex items-center gap-2"
        style={{ background: "#0d1117" }}
      >
        <span className="text-2xl">▶</span>
        <span className="text-gray-500 text-sm italic">Ready to run...</span>
      </div>
    );
  }

  const exitCode = result.run.code;
  const stdout = result.run.stdout;
  const stderr = result.run.stderr || result.compile?.stderr || "";
  const isSuccess = exitCode === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#3a3a55] overflow-hidden"
      style={{ background: "#0d1117" }}
      data-ocid={isSuccess ? "compiler.success_state" : "compiler.error_state"}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#1a1a2e]">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Output
        </span>
        {runTime !== null && (
          <span className="text-[11px] text-gray-600">⏱ {runTime}ms</span>
        )}
        <div className="ml-auto">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              isSuccess
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            Exit {exitCode}
          </span>
        </div>
      </div>

      {/* Compile error */}
      {result.compile?.stderr && (
        <div className="px-4 pt-3">
          <div className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-1.5">
            Compile Error
          </div>
          <pre className="text-red-300 text-xs font-mono leading-5 whitespace-pre-wrap rounded-lg bg-red-500/10 border border-red-500/20 p-3">
            {result.compile.stderr}
          </pre>
        </div>
      )}

      {/* Stderr */}
      {stderr && !result.compile?.stderr && (
        <div className="px-4 pt-3">
          <div className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-1.5">
            Error
          </div>
          <pre className="text-red-300 text-xs font-mono leading-5 whitespace-pre-wrap rounded-lg bg-red-500/10 border border-red-500/20 p-3">
            {stderr}
          </pre>
        </div>
      )}

      {/* Stdout */}
      {stdout ? (
        <div className="px-4 py-3">
          <div className="text-[11px] font-bold text-green-400 uppercase tracking-widest mb-1.5">
            Output
          </div>
          <pre className="text-green-300 text-xs font-mono leading-5 whitespace-pre-wrap rounded-lg bg-green-500/10 border border-green-500/20 p-3">
            {stdout}
          </pre>
        </div>
      ) : (
        !stderr &&
        !result.compile?.stderr && (
          <div className="px-4 py-3 text-gray-600 text-sm italic">
            (no output)
          </div>
        )
      )}
    </motion.div>
  );
}

// ─── Save Dialog ──────────────────────────────────────────────────────────────
function SaveDialog({
  onSave,
  onClose,
}: {
  onSave: (name: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      data-ocid="compiler.dialog"
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[#3a3a55] p-6"
        style={{ background: "#1e1e2e" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">💾 Save Code Snippet</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
            data-ocid="compiler.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && name.trim() && onSave(name.trim())
          }
          placeholder="Give this snippet a name..."
          className="mb-4 bg-[#0d1117] border-[#3a3a55] text-white placeholder:text-gray-600 focus:border-violet-500"
          autoFocus
          data-ocid="compiler.input"
        />
        <div className="flex gap-2">
          <Button
            onClick={() => name.trim() && onSave(name.trim())}
            disabled={!name.trim()}
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl"
            data-ocid="compiler.confirm_button"
          >
            <Save className="w-4 h-4 mr-2" /> Save
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-[#3a3a55] text-gray-400 hover:text-white rounded-xl"
            data-ocid="compiler.cancel_button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Saved Codes Panel ────────────────────────────────────────────────────────
function SavedCodesPanel({
  snippets,
  onLoad,
  onDelete,
}: {
  snippets: CodeSnippet[];
  onLoad: (s: CodeSnippet) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-[#3a3a55] overflow-hidden"
      style={{ background: "#181825" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-200 hover:text-white transition-colors"
        data-ocid="compiler.toggle"
      >
        <span className="text-base">📁</span>
        <span className="flex-1 text-left">My Saved Codes</span>
        <span className="text-[11px] font-normal text-gray-500 bg-[#2a2a3e] px-2 py-0.5 rounded-full">
          {snippets.length}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#2a2a3e] p-3 space-y-2">
              {snippets.length === 0 ? (
                <div
                  className="text-center py-6 text-gray-600 text-sm italic"
                  data-ocid="compiler.empty_state"
                >
                  No saved codes yet. Click 💾 to save your first snippet!
                </div>
              ) : (
                snippets.map((s, idx) => {
                  const lang = LANGUAGES.find((l) => l.id === s.language);
                  const date = new Date(s.savedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-center gap-3 bg-[#1e1e2e] border border-[#3a3a55] rounded-xl px-3 py-2.5 hover:border-violet-500/50 transition-colors group"
                      data-ocid={`compiler.item.${idx + 1}`}
                    >
                      <span className="text-lg shrink-0">
                        {lang?.emoji ?? "📄"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-200 truncate">
                          {s.name}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {lang?.name} · {date}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onLoad(s)}
                        className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-200 font-semibold px-2 py-1 rounded-lg hover:bg-violet-500/20 transition-colors"
                        data-ocid={`compiler.secondary_button.${idx + 1}`}
                      >
                        Load <ChevronRight className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(s.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-500/10"
                        data-ocid={`compiler.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MultiLangCompiler() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(STARTER_CODE.python);
  const [stdin, setStdin] = useState("");
  const [showStdin, setShowStdin] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PistonResult | null>(null);
  const [runTime, setRunTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [snippets, setSnippets] = useState<CodeSnippet[]>(loadSnippets);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(STARTER_CODE[lang] ?? `// Hello World in ${lang}`);
    setResult(null);
    setError(null);
  };

  const handleRun = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setResult(null);
    setError(null);
    const start = Date.now();

    try {
      const langId = JUDGE0_LANGUAGE_IDS[language] ?? 71;
      const res = await fetch(
        "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: code,
            language_id: langId,
            stdin: stdin || "",
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`API responded with ${res.status}`);
      }

      const data = await res.json();
      // Normalize Judge0 response to PistonResult shape
      const isCompileError = data.compile_output && data.status?.id !== 3;
      const normalized: PistonResult = {
        run: {
          stdout: data.stdout || "",
          stderr: data.stderr || "",
          code: data.status?.id === 3 ? 0 : 1,
          signal: null,
          output: data.stdout || "",
        },
        compile: isCompileError
          ? {
              stdout: "",
              stderr: data.compile_output || "",
              code: 1,
              signal: null,
              output: data.compile_output || "",
            }
          : undefined,
        language: language,
        version: "*",
      };
      setResult(normalized);
      setRunTime(Date.now() - start);
    } catch {
      setError("Could not connect to compiler. Please try again.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSave = (name: string) => {
    const snippet: CodeSnippet = {
      id: crypto.randomUUID(),
      name,
      language,
      code,
      stdin,
      savedAt: new Date().toISOString(),
    };
    const updated = [snippet, ...snippets];
    setSnippets(updated);
    saveSnippets(updated);
    setShowSaveDialog(false);
  };

  const handleLoad = (s: CodeSnippet) => {
    setLanguage(s.language);
    setCode(s.code);
    setStdin(s.stdin);
    setResult(null);
    setError(null);
  };

  const handleDelete = (id: string) => {
    const updated = snippets.filter((s) => s.id !== id);
    setSnippets(updated);
    saveSnippets(updated);
  };

  // Persist snippets whenever they change
  useEffect(() => {
    saveSnippets(snippets);
  }, [snippets]);

  const langObj = LANGUAGES.find((l) => l.id === language) ?? LANGUAGES[0];

  return (
    <div className="space-y-4 pb-6">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{
              background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
            }}
          >
            🚀
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base leading-tight">
              Multi-Language Compiler
            </h2>
            <p className="text-[11px] text-gray-500">
              20 languages · Powered by Judge0
            </p>
          </div>
        </div>
        <LangSelector selected={language} onChange={handleLanguageChange} />
      </div>

      {/* ── Code Editor ── */}
      <CodeEditor value={code} onChange={setCode} language={langObj.name} />

      {/* ── Stdin ── */}
      <div>
        <button
          type="button"
          onClick={() => setShowStdin((v) => !v)}
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-200 transition-colors"
          data-ocid="compiler.toggle"
        >
          {showStdin ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
          Input (stdin)
        </button>
        <AnimatePresence initial={false}>
          {showStdin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-2"
            >
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Provide program input here (one value per line)..."
                rows={3}
                className="w-full font-mono text-sm bg-[#0d1117] border border-[#3a3a55] text-gray-300 rounded-xl px-3 py-2.5 resize-none outline-none focus:border-violet-500 transition-colors placeholder:text-gray-600"
                data-ocid="compiler.textarea"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Action Bar ── */}
      <div className="flex gap-3">
        <Button
          onClick={handleRun}
          disabled={isRunning || !code.trim()}
          className="flex-1 font-bold rounded-xl h-11 text-white shadow-lg"
          style={{
            background: isRunning
              ? "#4c1d95"
              : "linear-gradient(135deg, #7c3aed, #6d28d9)",
            boxShadow: isRunning ? "none" : "0 4px 20px rgba(109,40,217,0.4)",
          }}
          data-ocid="compiler.primary_button"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowSaveDialog(true)}
          className="h-11 px-5 rounded-xl border-[#3a3a55] text-gray-300 hover:text-white hover:border-violet-500 transition-colors"
          style={{ background: "#1e1e2e" }}
          data-ocid="compiler.save_button"
        >
          <Save className="w-4 h-4 mr-2" /> Save
        </Button>
      </div>

      {/* ── Error Banner ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl px-4 py-3"
            data-ocid="compiler.error_state"
          >
            <span className="text-lg">⚠️</span>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Output Panel ── */}
      <OutputPanel result={result} isRunning={isRunning} runTime={runTime} />

      {/* ── Saved Codes ── */}
      <SavedCodesPanel
        snippets={snippets}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />

      {/* ── Save Dialog ── */}
      <AnimatePresence>
        {showSaveDialog && (
          <SaveDialog
            onSave={handleSave}
            onClose={() => setShowSaveDialog(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
