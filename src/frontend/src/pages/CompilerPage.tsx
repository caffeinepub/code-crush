import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal } from "lucide-react";
import MultiLangCompiler from "../components/MultiLangCompiler";
import { useApp } from "../context/AppContext";

export default function CompilerPage() {
  const { setPage } = useApp();

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: "#0d1117" }}
    >
      {/* Header */}
      <header
        className="shrink-0 flex items-center gap-3 px-4 py-3 border-b"
        style={{
          background: "#1e1e2e",
          borderColor: "#2a2a3e",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPage("study")}
          className="rounded-xl text-gray-400 hover:text-white hover:bg-white/10"
          data-ocid="compiler.back_button"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, #4c1d95, #7c3aed)",
          }}
        >
          <Terminal className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="font-extrabold text-white text-base leading-tight">
            Code Compiler
          </h1>
          <p className="text-[11px] text-gray-500">
            20+ languages · Judge0 powered · Auto-save
          </p>
        </div>
      </header>

      {/* Scrollable compiler body */}
      <div
        className="flex-1 overflow-y-auto px-4 pt-5"
        style={{ background: "#0d1117" }}
      >
        <MultiLangCompiler />
      </div>
    </div>
  );
}
