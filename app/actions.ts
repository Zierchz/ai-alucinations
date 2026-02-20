"use server";

import { questions } from "@/data/questions";
import type { Option, Question } from "@/lib/types";

export async function getQuestions(): Promise<Question[]> {
  return questions;
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
