"use client";

import { useEffect, useRef, useState } from "react";
import MathRenderer from "@/components/MathRenderer";

interface MathEquationEditorProps {
  onInsert: (latex: string) => void;
}

export default function MathEquationEditor({ onInsert }: MathEquationEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mathFieldRef = useRef<any>(null);
  const [latex, setLatex] = useState("");
  const [isBlock, setIsBlock] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mf: any;
    import("mathlive").then(() => {
      if (!containerRef.current || mathFieldRef.current) return;
      mf = document.createElement("math-field");
      Object.assign(mf.style, {
        width: "100%",
        fontSize: "1.25rem",
        padding: "10px 12px",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        background: "white",
        display: "block",
      });
      // disable virtual keyboard on desktop — the toolbar is enough
      mf.mathVirtualKeyboardPolicy = "manual";
      mf.addEventListener("input", () => {
        setLatex(mf.getValue("latex"));
      });
      containerRef.current.appendChild(mf);
      mathFieldRef.current = mf;
      mf.focus();
    });
    return () => {
      if (mf && containerRef.current?.contains(mf)) {
        containerRef.current.removeChild(mf);
      }
      mathFieldRef.current = null;
    };
  }, []);

  const preview = latex ? (isBlock ? `$$${latex}$$` : `$${latex}$`) : "";

  const handleInsert = () => {
    if (!latex) return;
    onInsert(isBlock ? `$$${latex}$$` : `$${latex}$`);
    if (mathFieldRef.current) {
      mathFieldRef.current.setValue("");
      setLatex("");
    }
  };

  return (
    <div className="mt-2 border border-[#1152d4]/30 rounded-xl p-4 bg-blue-50/50 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#1152d4]">∑ Tənlik redaktoru</span>
        <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-600 select-none">
          <input
            type="checkbox"
            checked={isBlock}
            onChange={(e) => setIsBlock(e.target.checked)}
            className="h-3.5 w-3.5 rounded"
          />
          Mərkəzləşdirilmiş (ayrı sətir)
        </label>
      </div>

      {/* MathLive mounts here */}
      <div ref={containerRef} />

      <p className="text-xs text-slate-400">
        Tip: <kbd className="bg-white border border-slate-200 rounded px-1">/</kbd> kəsr,{" "}
        <kbd className="bg-white border border-slate-200 rounded px-1">^</kbd> üs,{" "}
        <kbd className="bg-white border border-slate-200 rounded px-1">_</kbd> alt indeks,{" "}
        <kbd className="bg-white border border-slate-200 rounded px-1">\sqrt</kbd> kök
      </p>

      {preview && (
        <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-800 min-h-[2.5rem] flex items-center">
          <MathRenderer content={preview} />
        </div>
      )}

      <button
        type="button"
        onClick={handleInsert}
        disabled={!latex}
        className="w-full bg-[#1152d4] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#0e42b0] disabled:opacity-40 transition-colors"
      >
        Sahəyə daxil et
      </button>
    </div>
  );
}
