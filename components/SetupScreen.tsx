"use client";

import type { Player } from "@/lib/types";

interface Props {
  players: Player[];
  onChange: (i: number, name: string) => void;
  onStart: () => void;
}

export default function SetupScreen({ players, onChange, onStart }: Props) {
  const valid = players.every((p) => p.name.trim().length > 0);

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold font-mono text-[#4ec9b0] mb-2 text-center">
          Jugadores
        </h2>
        <p className="text-[#888] font-mono text-sm text-center mb-8">
          Ingresa los nombres de los 4 jugadores por favor
        </p>
        <div className="space-y-4 mb-8">
          {players.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[#007acc] font-bold font-mono w-8 text-center">
                J{i + 1}
              </span>
              <input
                type="text"
                value={p.name}
                onChange={(e) => onChange(i, e.target.value)}
                placeholder={`Jugador ${i + 1}`}
                className="flex-1 bg-[#252526] border-2 border-[#444] focus:border-[#4ec9b0] rounded-lg px-4 py-3 font-mono text-[#d4d4d4] outline-none transition-colors duration-200 placeholder:text-[#555]"
              />
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          disabled={!valid}
          className="w-full py-4 bg-linear-to-r from-[#007acc] to-[#4ec9b0] text-white font-bold font-mono text-lg rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[#007acc]/20 cursor-pointer"
        >
          ¡Comenzar Competencia!
        </button>
      </div>
    </div>
  );
}
