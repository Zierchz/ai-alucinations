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
                ? "border-[#f0883e] bg-[#f0883e]/10 text-[#f0883e] scale-105 shadow-lg shadow-[#f0883e]/20"
                : "border-[#30363d] bg-[#161b22] text-[#c9d1d9]"
            }`}
          >
            <span className="font-bold">{p.name}</span>
            <span className="ml-2 text-[#3fb950] font-bold">{p.score} pts</span>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between text-xs text-[#8b949e] font-mono mb-1">
          <span>
            Pregunta {currentQIdx + 1} de {totalQuestions}
          </span>
          <span>
            {Math.round((currentQIdx / totalQuestions) * 100)}% completado
          </span>
        </div>
        <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#f0883e] to-[#ff7b72] rounded-full transition-all duration-500"
            style={{ width: `${(currentQIdx / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
