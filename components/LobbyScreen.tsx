"use client";

import { BrainCircuit, AlertTriangle, BadgeQuestionMarkIcon } from "lucide-react";

export default function LobbyScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center p-6">
      <div className="text-center animate-fade-in w-full max-w-4xl mx-auto">
        <div className="mb-4 flex justify-center animate-pulse">
          <BrainCircuit size={64} className="text-[#4ec9b0]" />
          <BadgeQuestionMarkIcon className="text-[#4ec9b0]"/>
        </div>
        <h1 className="text-4xl md:text-4xl font-bold font-mono text-[#4ec9b0] mb-8 tracking-tight">
          Alucinaciones de Inteligencia Artificial
        </h1>

        {/* Definition card */}
        <div className="bg-[#252526] border border-[#3e3e42] rounded-xl p-6 mb-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-[#dcdcaa]" />
            <span className="text-[#dcdcaa] font-mono text-xs uppercase tracking-widest">
              ¿Qué es una alucinación de IA?
            </span>
          </div>
          <p className="text-[#d4d4d4] font-mono text-sm leading-relaxed mb-3">
            Una <span className="text-[#4ec9b0]">alucinación</span> en un modelo
            de lenguaje (LLM) es la generación de contenido que resulta{" "}
            <span className="text-[#ce9178]">
              sintácticamente coherente y convincente
            </span>
            , pero que es factualmente incorrecto, inexistente o no fundamentado
            en datos reales.
          </p>
          <p className="text-[#d4d4d4] font-mono text-sm leading-relaxed mb-3">
            A diferencia de un error de software tradicional, un modelo que
            alucina se comporta como un{" "}
            <span className="text-[#f44747]">fabricador convincente</span>:
            presenta información falsa con la misma confianza y autoridad con la
            que presenta hechos válidos.
          </p>
          <p className="text-[#d4d4d4] font-mono text-sm leading-relaxed">
            Esto ocurre porque los LLMs no "saben" ni "razonan" — predicen el
            siguiente token más probable según sus datos de entrenamiento, sin
            verificar si el resultado es real o correcto.
          </p>
        </div>

        <p className="text-[#888] font-mono text-sm mb-6">
          Identifica cuál fragmento de código es una alucinación. ¿Puedes
          distinguir el código real del inventado?
        </p>

        <button
          onClick={onStart}
          className="px-10 py-4 bg-linear-to-r from-[#007acc] to-[#4ec9b0] text-white font-bold font-mono text-xl rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#007acc]/30 cursor-pointer"
        >
          Comenzar Juego
        </button>
      </div>
    </div>
  );
}
