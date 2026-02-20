"use client";

import { Gamepad2 } from "lucide-react";
import type { Question, Option } from "@/lib/types";
import { highlight } from "@/lib/highlight";

interface Props {
  question: Question;
  playerName: string;
  selected: Option | null;
  onAnswer: (o: Option) => void;
  isPending: boolean;
}

const OPTIONS: Option[] = ["A", "B", "C", "D"];

export default function QuestionView({
  question,
  playerName,
  selected,
  onAnswer,
  isPending,
}: Props) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Player indicator */}
      <div className="flex items-center gap-3 mb-6 justify-center">
        <div className="h-px flex-1 bg-[#333]" />
        <div className="px-5 py-2 bg-[#252526] border border-[#4ec9b0] rounded-full font-mono text-[#4ec9b0] text-sm font-bold flex items-center gap-2">
          <Gamepad2 size={16} />
          Turno de <span className="text-white">{playerName}</span>
        </div>
        <div className="h-px flex-1 bg-[#333]" />
      </div>

      {/* Header */}
      <div className="border-l-4 border-[#4ec9b0] pl-5 mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-mono text-[#4ec9b0]">
          Ejemplo {question.id} — {question.language}
        </h2>
        <p className="text-[#ce9178] font-mono text-sm md:text-base mt-1">
          Tarea: {question.task}
        </p>
        <p className="text-[#888] font-mono text-xs mt-2">
          ¿Donde está la alucinación?
        </p>
      </div>

      {/* Code grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => onAnswer(opt)}
            disabled={!!selected || isPending}
            className={`relative text-left bg-linear-to-br from-[#1e1e1e] to-[#252526] border-2 border-[#007acc] rounded-xl p-5 font-mono text-sm transition-all duration-200 cursor-pointer
              hover:border-[#4ec9b0] hover:shadow-lg hover:shadow-[#007acc]/20 hover:scale-[1.02]
              active:scale-[0.98]
              disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-[#007acc]
              ${selected === opt ? "border-[#4ec9b0] scale-[1.02]" : ""}
            `}
          >
            <span className="absolute top-2 right-3 bg-linear-to-br from-[#007acc] to-[#0098ff] text-white text-xs font-bold px-2.5 py-1 rounded-md">
              {opt}
            </span>
            <pre
              className="text-[#d4d4d4] text-xs md:text-sm leading-relaxed whitespace-pre-wrap wrap-break-word pr-8"
              dangerouslySetInnerHTML={{
                __html: highlight(question.options[opt], question.language),
              }}
            />
          </button>
        ))}
      </div>

      {isPending && (
        <div className="flex justify-center mt-6">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
