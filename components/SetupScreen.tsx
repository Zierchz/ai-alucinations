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
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold font-mono text-[#f0883e] mb-2 text-center">
          Jugadores
        </h2>
        <p className="text-[#8b949e] font-mono text-sm text-center mb-8">
          Ingresa los nombres de los 4 jugadores por favor
        </p>
        <div className="space-y-4 mb-8">
          {players.map((p, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[#f0883e] font-bold font-mono w-8 text-center">
                J{i + 1}
              </span>
              <input
                type="text"
                value={p.name}
                onChange={(e) => onChange(i, e.target.value)}
                placeholder={`Jugador ${i + 1}`}
                className="flex-1 bg-[#161b22] border-2 border-[#30363d] focus:border-[#f0883e] rounded-lg px-4 py-3 font-mono text-[#c9d1d9] outline-none transition-colors duration-200 placeholder:text-[#484f58]"
              />
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          disabled={!valid}
          className="w-full py-4 bg-linear-to-r from-[#f0883e] to-[#ff7b72] text-white font-bold font-mono text-lg rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[#f0883e]/20 cursor-pointer"
        >
          ¡Comenzar Competencia!
        </button>
      </div>
    </div>
  );
}
