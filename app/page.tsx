import { Suspense } from "react";
import { getQuestions } from "./actions";
import GameClient from "@/components/GameClient";

export default async function Home() {
  const questions = await getQuestions();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#f0883e] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      }
    >
      <GameClient questions={questions} />
    </Suspense>
  );
}
