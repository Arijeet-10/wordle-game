import { useCallback, useEffect, useMemo, useState } from "react";
import { SOLUTIONS, ALLOWED } from "./words";
import type { EvalLetter } from "./type";

const WORD_LEN = 5;
const MAX_ROWS = 6;

function evaluate(guess: string, solution: string): EvalLetter[] {
  const res: EvalLetter[] = [];
  const sol = solution.split("");
  const used = Array(WORD_LEN).fill(false);

  // First pass: correct
  for (let i = 0; i < WORD_LEN; i++) {
    const ch = guess[i];
    if (ch === sol[i]) {
      res.push({ ch, state: "correct" });
      used[i] = true;
    } else {
      res.push({ ch, state: "empty" });
    }
  }
  // Second pass: present/absent
  for (let i = 0; i < WORD_LEN; i++) {
    if (res[i].state === "empty") {
      const ch = guess[i];
      let found = -1;
      for (let j = 0; j < WORD_LEN; j++) {
        if (!used[j] && sol[j] === ch) { found = j; break; }
      }
      if (found >= 0) {
        res[i].state = "present";
        used[found] = true;
      } else {
        res[i].state = "absent";
      }
    }
  }
  return res;
}


export function useWordle() {
  const [solution, setSolution] = useState<string>(() =>
    SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)]
  );
  const [rows, setRows] = useState<EvalLetter[][]>([]);
  const [current, setCurrent] = useState<string>("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [keyboardMap, setKeyboardMap] = useState<Record<string, "correct" | "present" | "absent">>({});
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [hintUsed, setHintUsed] = useState<boolean>(false);

  const canType = status === "playing" && rows.length < MAX_ROWS;

  const reset = useCallback((advanceLevel = false) => {
    setSolution(SOLUTIONS[Math.floor(Math.random() * SOLUTIONS.length)]);
    setRows([]);
    setCurrent("");
    setStatus("playing");
    setKeyboardMap({});
    setHintUsed(false);
    if (advanceLevel) setLevel(lvl => lvl + 1);
  }, []);
  // Hint: reveal a correct letter in the current word
  const useHint = useCallback(() => {
    if (hintUsed || status !== "playing") return;
    // Find first unrevealed correct letter
    for (let i = 0; i < solution.length; i++) {
      if (current[i] !== solution[i]) {
        // Fill that letter in current guess
        setCurrent(prev => prev.substring(0, i) + solution[i] + prev.substring(i + 1));
        setHintUsed(true);
        break;
      }
    }
  }, [hintUsed, status, current, solution]);

  const onChar = useCallback((c: string) => {
    if (!canType) return;
    if (current.length < 5) setCurrent(prev => prev + c);
  }, [canType, current.length]);

  const onDelete = useCallback(() => {
    if (!canType) return;
    setCurrent(prev => prev.slice(0, -1));
  }, [canType]);

  const onEnter = useCallback(() => {
    if (!canType || current.length !== WORD_LEN) return;
    const guess = current.toUpperCase();

    if (!ALLOWED.has(guess)) {
      // simple feedback; you could add a toast
      alert("Not in word list");
      return;
    }

    const row = evaluate(guess, solution);
    setRows(prev => [...prev, row]);
    setCurrent("");

    // update keyboard map with strongest state priority: correct > present > absent
    setKeyboardMap(prev => {
      const next = { ...prev };
      for (const { ch, state } of row) {
        const s = next[ch];
        if (s === "correct") continue;
        if (s === "present" && state === "absent") continue;
        next[ch] = state === "correct" ? "correct" : state === "present" ? "present" : "absent";
      }
      return next;
    });

    if (guess === solution) {
      setStatus("won");
      setScore(s => s + 10 * level); // Award points, scale with level
    } else if (rows.length + 1 >= MAX_ROWS) {
      setStatus("lost");
    }
  }, [ALLOWED, canType, current, rows.length, solution]);

  // Keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!canType && e.key !== "Enter") return;
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) onChar(key);
      else if (e.key === "Backspace") onDelete();
      else if (e.key === "Enter") onEnter();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [canType, onChar, onDelete, onEnter]);

  const shareText = useMemo(() => {
    if (status === "playing") return "";
    const lines = rows.map(r =>
      r.map(cell => cell.state === "correct" ? "🟩" : cell.state === "present" ? "🟨" : "⬛").join("")
    ).join("\n");
    return `Wordle Clone L${level} S${score} ${status === "won" ? rows.length : "X"}/${MAX_ROWS}\n${lines}`;
  }, [rows, status, level, score]);

  // Add nextLevel function to advance level after win
  const nextLevel = useCallback(() => {
    reset(true);
  }, [reset]);

  return {
    solution, rows, current, status, keyboardMap,
    onChar, onDelete, onEnter, reset, shareText,
    WORD_LEN, MAX_ROWS,
    level, score, nextLevel,
    hintUsed, useHint
  };
}
