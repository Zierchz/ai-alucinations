"use client";

import { Trophy, Swords } from "lucide-react";
import type { Player } from "@/lib/types";

interface Props {
  players: Player[];
  winners: Player[];
  onTiebreaker?: () => void;
  tiebreakerWinner?: string;
  onPlayAgain?: () => void;
}

export default function WinnerScreen({
  players,
  winners,
  onTiebreaker,
  tiebreakerWinner,
  onPlayAgain,
}: Props) {
  const isTie = winners.length > 1 && !tiebreakerWinner;
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const displayName =
    tiebreakerWinner ??
    (isTie ? winners.map((w) => w.name).join(" y ") : winners[0].name);

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-lg w-full animate-fade-in">
        <div className="mb-4 flex justify-center animate-pulse">
          <Trophy size={100} className="text-[#4ec9b0]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold font-mono text-[#4ec9b0] mb-2">
          {isTie ? "¡Empate!" : "¡Tenemos un ganador!"}
        </h1>
        <p className="text-[#ce9178] font-mono text-xl mb-1">{displayName}</p>
        <p className="text-[#888] font-mono text-sm mb-8">
          {isTie ? "Ambos con" : "Con"} {winners[0].score} puntos
        </p>

        <div className="bg-[#252526] border border-[#333] rounded-xl p-6 mb-8">
          <h3 className="text-[#4ec9b0] font-mono font-bold mb-4 text-sm uppercase tracking-widest">
            Tabla Final
          </h3>
          <div className="space-y-3">
            {sorted.map((p, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-2 rounded-lg font-mono text-sm
                  ${i === 0 ? "bg-[#4ec9b0]/10 border border-[#4ec9b0]/30" : "bg-[#1e1e1e]"}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#888] w-5">{i + 1}.</span>
                  <span
                    className={
                      i === 0 ? "text-[#4ec9b0] font-bold" : "text-[#d4d4d4]"
                    }
                  >
                    {p.name}
                  </span>
                </div>
                <span
                  className={`font-bold ${i === 0 ? "text-[#4ec9b0]" : "text-[#b5cea8]"}`}
                >
                  {p.score} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center">
          {isTie && onTiebreaker && (
            <button
              onClick={onTiebreaker}
              className="px-8 py-3 bg-linear-to-r from-[#f44747] to-[#ff6b6b] text-white font-bold font-mono rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#f44747]/20 cursor-pointer flex items-center gap-2"
            >
              <Swords size={18} />
              Comenzar el desempate
            </button>
          )}
          <button
            onClick={onPlayAgain || (() => window.location.reload())}
            className="px-8 py-3 bg-linear-to-r from-[#007acc] to-[#4ec9b0] text-white font-bold font-mono rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#007acc]/20 cursor-pointer"
          >
            Jugar de Nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
