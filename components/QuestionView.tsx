"use client";

import { Gamepad2 } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Question, Option } from "@/lib/types";
import { highlight } from "@/lib/highlight";

interface Props {
  question: Question;
  playerName: string;
  selected: Option | null;
  onAnswer: (o: Option) => void;
  isPending: boolean;
  timeLeft: number;
}

const OPTIONS: Option[] = ["A", "B", "C", "D"];

// Generate a simple beep sound using Web Audio API
function playTickSound() {
  const audioContext = new (
    window.AudioContext || (window as any).webkitAudioContext
  )();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800; // Hz
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.1,
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Generate a softer, lighter tick sound for normal countdown
function playLightTickSound() {
  const audioContext = new (
    window.AudioContext || (window as any).webkitAudioContext
  )();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 600; // Hz (lower pitch)
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Much quieter
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.08,
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.08);
}

// Generate a clock alarm sound when time's up
function playTimeUpSound() {
  const audioContext = new (
    window.AudioContext || (window as any).webkitAudioContext
  )();
  const now = audioContext.currentTime;

  // Create two oscillators for a "ding-dong" effect
  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // First note (high)
  osc1.frequency.value = 1000; // Hz
  osc1.type = "sine";
  gainNode.gain.setValueAtTime(0.25, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  osc1.start(now);
  osc1.stop(now + 0.3);

  // Second note (lower) - delayed
  osc2.frequency.value = 700; // Hz
  osc2.type = "sine";
  osc2.start(now + 0.35);
  osc2.stop(now + 0.65);
}

export default function QuestionView({
  question,
  playerName,
  selected,
  onAnswer,
  isPending,
  timeLeft,
}: Props) {
  const displayed = Math.min(timeLeft - 1, 15);
  const isUrgent = displayed <= 5;
  const lastPlayedRef = useRef<number | null>(null);
  const timeUpPlayedRef = useRef(false);

  // Play tick sound when urgent, light tick for normal countdown
  useEffect(() => {
    if (displayed > 0 && displayed !== lastPlayedRef.current) {
      if (isUrgent) {
        playTickSound(); // Loud beep when urgent
      } else {
        playLightTickSound(); // Soft tick for normal countdown
      }
      lastPlayedRef.current = displayed;
    }
  }, [isUrgent, displayed]);

  // Play time up sound when time reaches 0
  useEffect(() => {
    if (displayed === 0 && !timeUpPlayedRef.current) {
      playTimeUpSound();
      timeUpPlayedRef.current = true;
    }
  }, [displayed]);

  // SVG circle clock params
  const r = 32;
  const circ = 2 * Math.PI * r;
  const dash = circ * (displayed / 15);

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

      {/* Header + Clock */}
      <div className="flex items-center gap-5 mb-6">
        {/* Circular clock */}
        <div className="shrink-0 relative">
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Track */}
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="#3e3e42"
              strokeWidth="5"
            />
            {/* Arc */}
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke={isUrgent ? "#f44747" : "#4ec9b0"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform="rotate(-90 40 40)"
              style={{ transition: "stroke-dasharray 1s linear, stroke 0.3s" }}
            />
            {/* Number */}
            <text
              x="40"
              y="46"
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fontFamily="monospace"
              fill={isUrgent ? "#f44747" : "#4ec9b0"}
            >
              {displayed}
            </text>
          </svg>
          {isUrgent && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#f44747] rounded-full animate-ping" />
          )}
        </div>

        {/* Header text */}
        <div className="border-l-4 border-[#4ec9b0] pl-5">
          <h2 className="text-xl md:text-2xl font-bold font-mono text-[#4ec9b0]">
            Lenguaje — {question.language}
          </h2>
          <p className="text-[#ce9178] font-mono text-sm md:text-base mt-1">
            Tarea: {question.task}
          </p>
          <p className="text-[#888] font-mono text-xs mt-2">
            ¿Donde está la alucinación?
          </p>
        </div>
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
