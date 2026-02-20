"use client";

import { useState, useEffect } from "react";
import { Swords, CheckCircle2, XCircle, Trophy } from "lucide-react";
import type { Question, Option } from "@/lib/types";
import { checkAnswer } from "@/app/actions";
import QuestionView from "./QuestionView";
import RevealView from "./RevealView";

interface Props {
  players: string[]; // names of tied players
  questions: Question[]; // remaining 20 questions
  onDone: (winner: string) => void;
}

type TBPhase = "playing" | "reveal" | "winner";

interface RoundResult {
  playerName: string;
  correct: boolean;
}

export default function TiebreakerClient({
  players,
  questions,
  onDone,
}: Props) {
  const [activePlayers, setActivePlayers] = useState<string[]>(players);
  const [roundNum, setRoundNum] = useState(0);
  const [playerTurnIdx, setPlayerTurnIdx] = useState(0);
  const [phase, setPhase] = useState<TBPhase>("playing");
  const [selected, setSelected] = useState<Option | null>(null);
  const [revealData, setRevealData] = useState<{
    correct: boolean;
    answer: Option;
    explanation: string;
    timeout?: boolean;
  } | null>(null);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(16);
  const [winner, setWinner] = useState<string | null>(null);

  // Each player in the round gets a different question
  const qIdxForCurrentPlayer = roundNum * activePlayers.length + playerTurnIdx;
  const currentQ = questions[qIdxForCurrentPlayer];
  const currentPlayer = activePlayers[playerTurnIdx];
  const isLastPlayerInRound = playerTurnIdx === activePlayers.length - 1;

  // Timer
  useEffect(() => {
    if (phase !== "playing" || !!selected) return;
    setTimeLeft(16);
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, roundNum, playerTurnIdx]);

  // Time's up
  useEffect(() => {
    if (phase !== "playing" || !!selected || timeLeft > 0) return;
    checkAnswer(currentQ.id, "" as Option).then((result) => {
      const newResults = [
        ...roundResults,
        { playerName: currentPlayer, correct: false },
      ];
      setRoundResults(newResults);
      setRevealData({ ...result, correct: false, timeout: true });
      setSelected("" as Option);
      setPhase("reveal");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function handleAnswer(option: Option) {
    if (selected) return;
    setSelected(option);
    checkAnswer(currentQ.id, option).then((result) => {
      const newResults = [
        ...roundResults,
        { playerName: currentPlayer, correct: result.correct },
      ];
      setRoundResults(newResults);
      setRevealData(result);
      setPhase("reveal");
    });
  }

  function handleNext() {
    if (!isLastPlayerInRound) {
      // Next player in this round, different question
      setPlayerTurnIdx((i) => i + 1);
      setSelected(null);
      setRevealData(null);
      setPhase("playing");
      return;
    }

    // End of round — evaluate results
    const allResults = roundResults;
    const correct = allResults
      .filter((r) => r.correct)
      .map((r) => r.playerName);
    const incorrect = allResults
      .filter((r) => !r.correct)
      .map((r) => r.playerName);

    let surviving = activePlayers;

    if (correct.length === 0) {
      // Nobody got it right — next round, same players
      surviving = activePlayers;
    } else if (correct.length === activePlayers.length) {
      // Everyone got it right — next round, same players
      surviving = activePlayers;
    } else {
      // Eliminate wrong players
      surviving = correct;
    }

    if (surviving.length === 1) {
      setWinner(surviving[0]);
      setPhase("winner");
      return;
    }

    // Next round
    setActivePlayers(surviving);
    setRoundNum((r) => r + 1);
    setPlayerTurnIdx(0);
    setRoundResults([]);
    setSelected(null);
    setRevealData(null);
    setPhase("playing");
  }

  if (phase === "winner" && winner) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md animate-fade-in">
          <div className="mb-4 flex justify-center animate-bounce">
            <Trophy size={72} className="text-[#dcdcaa]" />
          </div>
          <h1 className="text-4xl font-bold font-mono text-[#dcdcaa] mb-2">
            ¡Ganador del desempate!
          </h1>
          <p className="text-[#4ec9b0] font-mono text-2xl font-bold mb-8">
            {winner}
          </p>
          <button
            onClick={() => onDone(winner)}
            className="px-8 py-3 bg-linear-to-r from-[#007acc] to-[#4ec9b0] text-white font-bold font-mono rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Ver Resultados Finales
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] p-4 md:p-8">
      {/* Tiebreaker header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between bg-[#252526] border border-[#f44747]/40 rounded-xl px-5 py-3">
          <div className="flex items-center gap-2 font-mono text-[#f44747] font-bold">
            <Swords size={18} />
            <span>Muerte Súbita</span>
          </div>
          <div className="flex gap-3">
            {activePlayers.map((name) => {
              const result = roundResults.find((r) => r.playerName === name);
              return (
                <div
                  key={name}
                  className="flex items-center gap-1.5 font-mono text-sm"
                >
                  {result ? (
                    result.correct ? (
                      <CheckCircle2 size={14} className="text-[#4ec9b0]" />
                    ) : (
                      <XCircle size={14} className="text-[#f44747]" />
                    )
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-[#888] inline-block" />
                  )}
                  <span
                    className={
                      name === currentPlayer && phase === "playing"
                        ? "text-white font-bold"
                        : "text-[#888]"
                    }
                  >
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {phase === "playing" && (
        <QuestionView
          question={currentQ}
          playerName={currentPlayer}
          selected={selected}
          onAnswer={handleAnswer}
          isPending={false}
          timeLeft={timeLeft}
        />
      )}

      {phase === "reveal" && revealData && (
        <RevealView
          question={currentQ}
          selected={selected ?? ("" as Option)}
          revealData={revealData}
          playerName={currentPlayer}
          onNext={handleNext}
          isLast={false}
          timeout={!!revealData.timeout}
          nextLabel={
            isLastPlayerInRound
              ? "Ver resultado de la ronda →"
              : `Turno de ${activePlayers[playerTurnIdx + 1]} →`
          }
        />
      )}
    </div>
  );
}
