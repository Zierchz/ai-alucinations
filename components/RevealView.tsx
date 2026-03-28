"use client";

import { CheckCircle2, XCircle, ShieldAlert } from "lucide-react";
import type { Question, Option } from "@/lib/types";
import { highlight } from "@/lib/highlight";

interface Props {
  question: Question;
  selected: Option;
  revealData: { correct: boolean; answer: Option; explanation: string };
  playerName: string;
  onNext: () => void;
  isLast: boolean;
  timeout?: boolean;
  nextLabel?: string;
}

const OPTIONS: Option[] = ["A", "B", "C", "D"];

export default function RevealView({
  question,
  selected,
  revealData,
  playerName,
  onNext,
  isLast,
  timeout,
  nextLabel,
}: Props) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Result banner */}
      <div
        className={`flex items-center gap-3 justify-center mb-6 px-6 py-3 rounded-xl border-2 font-mono font-bold text-lg transition-all
          ${
            revealData.correct
              ? "border-[#3fb950] bg-[#3fb950]/10 text-[#3fb950]"
              : "border-[#f85149] bg-[#f85149]/10 text-[#f85149]"
          }`}
      >
        <span>
          {revealData.correct ? (
            <CheckCircle2 size={22} />
          ) : (
            <XCircle size={22} />
          )}
        </span>
        <span>
          {playerName} —{" "}
          {revealData.correct
            ? "¡Correcto! +1 punto"
            : timeout
              ? "⏱ Se acabó el tiempo"
              : "Incorrecto"}
        </span>
      </div>

      {/* Header */}
      <div className="border-l-4 border-[#f0883e] pl-5 mb-6">
        <h2 className="text-xl font-bold font-mono text-[#f0883e]">
          Respuesta: Opción {revealData.answer} es la vulnerable
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <ShieldAlert size={14} className="text-[#ff7b72]" />
          <span className="text-[#ff7b72] font-mono text-xs font-bold uppercase">
            {question.vulnerability}
          </span>
        </div>
      </div>

      {/* Code grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {OPTIONS.map((opt) => {
          const isAnswer = opt === revealData.answer;
          const isWrongAnswer = opt === selected && !isAnswer;
          return (
            <div
              key={opt}
              className={`relative rounded-xl p-4 font-mono text-xs border-2 transition-all duration-300
                ${
                  isAnswer
                    ? "border-[#f85149] bg-linear-to-br from-[#2d1117] to-[#1a0a0a] shadow-lg shadow-[#f85149]/20"
                    : isWrongAnswer
                      ? "border-[#f0883e] bg-linear-to-br from-[#2d1f17] to-[#1a1510] shadow-lg shadow-[#f0883e]/20"
                      : "border-[#21262d] bg-[#161b22] opacity-50"
                }
              `}
            >
              {isAnswer && (
                <span className="absolute top-2 right-2 bg-[#f85149] text-white text-xs font-bold px-2 py-0.5 rounded">
                  VULNERABLE
                </span>
              )}
              {isWrongAnswer && (
                <span className="absolute top-2 right-2 bg-[#f0883e] text-white text-xs font-bold px-2 py-0.5 rounded">
                  Tu respuesta
                </span>
              )}
              <span
                className={`font-bold mr-2 ${isAnswer ? "text-[#f85149]" : isWrongAnswer ? "text-[#f0883e]" : "text-[#8b949e]"}`}
              >
                {opt}:
              </span>
              <pre
                className={`inline whitespace-pre-wrap wrap-break-word ${isAnswer ? "text-[#ffa198]" : isWrongAnswer ? "text-[#ffb86c]" : "text-[#484f58]"}`}
                dangerouslySetInnerHTML={{
                  __html: highlight(question.options[opt], question.language),
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <div className="bg-linear-to-br from-[#1c1e24] to-[#161b22] border-l-4 border-[#f0883e] rounded-xl p-5 mb-6">
        <span className="text-[#f0883e] font-bold font-mono">¿Por qué es vulnerable? </span>
        <span className="text-[#c9d1d9] font-mono text-sm leading-relaxed">
          {revealData.explanation}
        </span>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-linear-to-r from-[#f0883e] to-[#ff7b72] text-white font-bold font-mono rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#f0883e]/20 cursor-pointer"
        >
          {nextLabel ??
            (isLast ? "Ver Resultados Finales" : "Siguiente Pregunta →")}
        </button>
      </div>
    </div>
  );
}
