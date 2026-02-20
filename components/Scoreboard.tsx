"use client";

import type { Player } from "@/lib/types";

interface Props {
  players: Player[];
  currentPlayerIdx: number;
  currentQIdx: number;
  totalQuestions: number;
  phase: string;
}

export default function Scoreboard({
  players,
  currentPlayerIdx,
  currentQIdx,
  totalQuestions,
  phase,
}: Props) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {players.map((p, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-lg border-2 font-mono text-sm transition-all duration-300 ${
              i === currentPlayerIdx && phase === "playing"
                ? "border-[#4ec9b0] bg-[#4ec9b0]/10 text-[#4ec9b0] scale-105 shadow-lg shadow-[#4ec9b0]/20"
                : "border-[#444] bg-[#252526] text-[#d4d4d4]"
            }`}
          >
            <span className="font-bold">{p.name}</span>
            <span className="ml-2 text-[#b5cea8] font-bold">{p.score} pts</span>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between text-xs text-[#888] font-mono mb-1">
          <span>
            Pregunta {currentQIdx + 1} de {totalQuestions}
          </span>
          <span>
            {Math.round((currentQIdx / totalQuestions) * 100)}% completado
          </span>
        </div>
        <div className="h-1.5 bg-[#333] rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#007acc] to-[#4ec9b0] rounded-full transition-all duration-500"
            style={{ width: `${(currentQIdx / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
