export type LetterState = "empty" | "correct" | "present" | "absent";

export interface EvalLetter {
  ch: string;
  state: LetterState;
}
