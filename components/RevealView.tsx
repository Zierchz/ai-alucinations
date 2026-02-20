"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import type { Question, Option } from "@/lib/types";
import { highlight } from "@/lib/highlight";

interface Props {
  question: Question;
  selected: Option;
  revealData: { correct: boolean; answer: Option; explanation: string };
  playerName: string;
  onNext: () => void;
  isLast: boolean;
}

const OPTIONS: Option[] = ["A", "B", "C", "D"];

export default function RevealView({
  question,
  selected,
  revealData,
  playerName,
  onNext,
  isLast,
}: Props) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Result banner */}
      <div
        className={`flex items-center gap-3 justify-center mb-6 px-6 py-3 rounded-xl border-2 font-mono font-bold text-lg transition-all
          ${
            revealData.correct
              ? "border-[#4ec9b0] bg-[#4ec9b0]/10 text-[#4ec9b0]"
              : "border-[#ff6b6b] bg-[#ff6b6b]/10 text-[#ff6b6b]"
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
          {revealData.correct ? "¡Correcto! +1 punto" : "Incorrecto"}
        </span>
      </div>

      {/* Header */}
      <div className="border-l-4 border-[#4ec9b0] pl-5 mb-6">
        <h2 className="text-xl font-bold font-mono text-[#4ec9b0]">
          Respuesta: Opción {revealData.answer} es la alucinación
        </h2>
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
                    ? "border-[#4ec9b0] bg-linear-to-br from-[#1a3c2e] to-[#152d22] shadow-lg shadow-[#4ec9b0]/20"
                    : isWrongAnswer
                      ? "border-[#ff6b6b] bg-linear-to-br from-[#3c1e1e] to-[#2d1515] shadow-lg shadow-[#ff6b6b]/20"
                      : "border-[#333] bg-[#252526] opacity-50"
                }
              `}
            >
              {isAnswer && (
                <span className="absolute top-2 right-2 bg-[#4ec9b0] text-[#1e1e1e] text-xs font-bold px-2 py-0.5 rounded">
                  ALUCINACIÓN
                </span>
              )}
              {isWrongAnswer && (
                <span className="absolute top-2 right-2 bg-[#ff6b6b] text-white text-xs font-bold px-2 py-0.5 rounded">
                  Tu respuesta
                </span>
              )}
              <span
                className={`font-bold mr-2 ${isAnswer ? "text-[#4ec9b0]" : isWrongAnswer ? "text-[#ff6b6b]" : "text-[#888]"}`}
              >
                {opt}:
              </span>
              <pre
                className={`inline whitespace-pre-wrap wrap-break-word ${isAnswer ? "text-[#a8e6d4]" : isWrongAnswer ? "text-[#ff9999]" : "text-[#666]"}`}
                dangerouslySetInnerHTML={{
                  __html: highlight(question.options[opt], question.language),
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <div className="bg-linear-to-br from-[#2d2d2d] to-[#252526] border-l-4 border-[#4ec9b0] rounded-xl p-5 mb-6">
        <span className="text-[#4ec9b0] font-bold font-mono">¿Por qué? </span>
        <span className="text-[#d4d4d4] font-mono text-sm leading-relaxed">
          {revealData.explanation}
        </span>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-linear-to-r from-[#007acc] to-[#4ec9b0] text-white font-bold font-mono rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#007acc]/20 cursor-pointer"
        >
          {isLast ? "Ver Resultados Finales" : "Siguiente Pregunta →"}
        </button>
      </div>
    </div>
  );
}
