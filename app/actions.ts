"use server";

import { questions } from "@/data/questions";
import type { Option, Question } from "@/lib/types";

export async function getQuestions(): Promise<Question[]> {
  // Shuffle and return 20 questions (5 rounds per player × 4 players)
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 20);
}

export async function getTiebreakerQuestions(
  usedIds: number[],
): Promise<Question[]> {
  const remaining = questions.filter((q) => !usedIds.includes(q.id));
  if (remaining.length === 0) {
    throw new Error("No remaining questions for tiebreaker");
  }
  return remaining.sort(() => Math.random() - 0.5);
}

export async function checkAnswer(
  questionId: number,
  selected: Option,
): Promise<{ correct: boolean; answer: Option; explanation: string }> {
  const q = questions.find((q) => q.id === questionId);
  if (!q) throw new Error("Question not found");
  return {
    correct: selected === q.answer,
    answer: q.answer,
    explanation: q.explanation,
  };
}
