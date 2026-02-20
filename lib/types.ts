export type Option = "A" | "B" | "C" | "D";

export interface Question {
  id: number;
  language: string;
  task: string;
  options: Record<Option, string>;
  answer: Option;
  explanation: string;
}

export interface Player {
  name: string;
  score: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  currentQuestionIndex: number;
  phase: "lobby" | "playing" | "reveal" | "finished";
  selectedAnswer: Option | null;
  questions: Question[];
}
