"use client";

import { ShieldAlert, Bug, SearchCode } from "lucide-react";

export default function LobbyScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-6">
      <div className="text-center animate-fade-in w-full max-w-4xl mx-auto">
        <div className="mb-4 flex justify-center gap-3 animate-pulse">
          <ShieldAlert size={64} className="text-[#f0883e]" />
          <SearchCode size={64} className="text-[#f0883e]" />
        </div>
        <h1 className="text-4xl md:text-4xl font-bold font-mono text-[#f0883e] mb-8 tracking-tight">
          CyberCode Challenge
        </h1>

        {/* Definition card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 mb-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Bug size={16} className="text-[#ff7b72]" />
            <span className="text-[#ff7b72] font-mono text-xs uppercase tracking-widest">
              ¿Qué es una vulnerabilidad de código?
            </span>
          </div>
          <p className="text-[#c9d1d9] font-mono text-sm leading-relaxed mb-3">
            Una <span className="text-[#f0883e]">vulnerabilidad</span> es una
            debilidad en el código que puede ser{" "}
            <span className="text-[#ff7b72]">
              explotada por un atacante
            </span>{" "}
            para comprometer la seguridad de un sistema: robar datos, ejecutar
            comandos no autorizados, escalar privilegios o interrumpir servicios.
          </p>
          <p className="text-[#c9d1d9] font-mono text-sm leading-relaxed mb-3">
            A diferencia de un bug funcional, una vulnerabilidad puede parecer{" "}
            <span className="text-[#79c0ff]">código que funciona correctamente</span>,
            pero contiene una puerta abierta que un atacante con conocimiento
            puede aprovechar para causar daño real.
          </p>
          <p className="text-[#c9d1d9] font-mono text-sm leading-relaxed">
            Esto incluye categorías como{" "}
            <span className="text-[#f0883e]">SQL Injection</span>,{" "}
            <span className="text-[#f0883e]">XSS</span>,{" "}
            <span className="text-[#f0883e]">Command Injection</span>,{" "}
            <span className="text-[#f0883e]">Path Traversal</span>,{" "}
            <span className="text-[#f0883e]">CSRF</span> y muchas más del
            OWASP Top 10.
          </p>
        </div>

        <p className="text-[#8b949e] font-mono text-sm mb-6">
          Dado el lenguaje y el tipo de vulnerabilidad, identifica cuál
          fragmento de código es vulnerable. ¿Puedes encontrar la falla?
        </p>

        <button
          onClick={onStart}
          className="px-10 py-4 bg-linear-to-r from-[#f0883e] to-[#ff7b72] text-white font-bold font-mono text-xl rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#f0883e]/30 cursor-pointer"
        >
          Comenzar Juego
        </button>
      </div>
    </div>
  );
}
