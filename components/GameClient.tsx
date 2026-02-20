"use client";

import { useTransition, useEffect, useState } from "react";
import {
  useQueryState,
  useQueryStates,
  parseAsInteger,
  parseAsString,
} from "nuqs";
import type { Question, Option, Player } from "@/lib/types";
import { checkAnswer } from "@/app/actions";
import LobbyScreen from "./LobbyScreen";
import SetupScreen from "./SetupScreen";
import QuestionView from "./QuestionView";
import RevealView from "./RevealView";
import WinnerScreen from "./WinnerScreen";
import Scoreboard from "./Scoreboard";

type Phase = "lobby" | "setup" | "playing" | "reveal" | "finished";

const PHASES: Phase[] = ["lobby", "setup", "playing", "reveal", "finished"];
const parseAsPhase = parseAsString.withDefault("lobby" as string);

interface Props {
  questions: Question[];
}

export default function GameClient({ questions }: Props) {
  const [phase, setPhase] = useQueryState("ph", parseAsPhase);
  const [currentQIdx, setCurrentQIdx] = useQueryState(
    "q",
    parseAsInteger.withDefault(0),
  );
  const [currentPlayerIdx, setCurrentPlayerIdx] = useQueryState(
    "p",
    parseAsInteger.withDefault(0),
  );
  const [selected, setSelected] = useQueryState(
    "sel",
    parseAsString.withDefault(""),
  );

  const [playerState, setPlayerState] = useQueryStates({
    n0: parseAsString.withDefault(""),
    n1: parseAsString.withDefault(""),
    n2: parseAsString.withDefault(""),
    n3: parseAsString.withDefault(""),
    s0: parseAsInteger.withDefault(0),
    s1: parseAsInteger.withDefault(0),
    s2: parseAsInteger.withDefault(0),
    s3: parseAsInteger.withDefault(0),
  });

  const [revealData, setRevealData] = useState<{
    correct: boolean;
    answer: Option;
    explanation: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  // Reconstruct revealData on mount/reload if we're in reveal phase
  useEffect(() => {
    if (phase === "reveal" && selected && !revealData) {
      const q = questions[currentQIdx];
      if (q) {
        checkAnswer(q.id, selected as Option).then(setRevealData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const players: Player[] = [0, 1, 2, 3].map((i) => ({
    name: playerState[`n${i}` as keyof typeof playerState] as string,
    score: playerState[`s${i}` as keyof typeof playerState] as number,
  }));

  const currentQ = questions[currentQIdx];
  const currentPlayer = players[currentPlayerIdx];
  const typedPhase = (
    PHASES.includes(phase as Phase) ? phase : "lobby"
  ) as Phase;

  function handleNameChange(idx: number, name: string) {
    setPlayerState({ [`n${idx}`]: name });
  }

  function startGame() {
    if (players.some((p) => !p.name.trim())) return;
    setPhase("playing");
  }

  function handleAnswer(option: Option) {
    if (selected || isPending) return;
    setSelected(option);
    startTransition(async () => {
      const result = await checkAnswer(currentQ.id, option);
      if (result.correct) {
        const key = `s${currentPlayerIdx}` as keyof typeof playerState;
        const current = playerState[key] as number;
        setPlayerState({ [key]: current + 1 });
      }
      setRevealData(result);
      setPhase("reveal");
    });
  }

  function nextTurn() {
    const nextQIdx = currentQIdx + 1;
    if (nextQIdx >= questions.length) {
      setPhase("finished");
      return;
    }
    const nextPlayerIdx = (currentPlayerIdx + 1) % players.length;
    setCurrentQIdx(nextQIdx);
    setCurrentPlayerIdx(nextPlayerIdx);
    setSelected("");
    setRevealData(null);
    setPhase("playing");
  }

  const maxScore = Math.max(...players.map((p) => p.score));
  const winners = players.filter((p) => p.score === maxScore);

  if (typedPhase === "lobby")
    return <LobbyScreen onStart={() => setPhase("setup")} />;
  if (typedPhase === "setup")
    return (
      <SetupScreen
        players={players}
        onChange={handleNameChange}
        onStart={startGame}
      />
    );
  if (typedPhase === "finished")
    return <WinnerScreen players={players} winners={winners} />;

  return (
    <div className="min-h-screen bg-[#1e1e1e] p-4 md:p-8">
      <Scoreboard
        players={players}
        currentPlayerIdx={currentPlayerIdx}
        currentQIdx={currentQIdx}
        totalQuestions={questions.length}
        phase={typedPhase}
      />

      {typedPhase === "playing" && (
        <QuestionView
          question={currentQ}
          playerName={currentPlayer.name}
          selected={(selected as Option) || null}
          onAnswer={handleAnswer}
          isPending={isPending}
        />
      )}

      {typedPhase === "reveal" && revealData && (
        <RevealView
          question={currentQ}
          selected={selected as Option}
          revealData={revealData}
          playerName={currentPlayer.name}
          onNext={nextTurn}
          isLast={currentQIdx + 1 >= questions.length}
        />
      )}

      {typedPhase === "reveal" && !revealData && (
        <div className="flex justify-center mt-20">
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
  