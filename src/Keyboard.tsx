

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["ENTER", ..."ZXCVBNM".split(""), "DEL"],
];

export default function Keyboard({
  onChar, onDelete, onEnter, keyStates
}: {
  onChar: (c: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  keyStates: Record<string, "correct" | "present" | "absent">;
}) {
  return (
    <div className="mt-4 select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {row.map(k => {
            const label = k;
            const state = keyStates[k] || "";
            const cls =
              state === "correct" ? "bg-correct" :
              state === "present" ? "bg-present" :
              state === "absent" ? "bg-absent" :
              "bg-zinc-700";
            const wide = k === "ENTER" || k === "DEL" ? "px-3" : "px-2";
            return (
              <button
                key={k}
                onClick={() => k === "ENTER" ? onEnter() : k === "DEL" ? onDelete() : onChar(k)}
                className={`text-sm md:text-base h-12 rounded-lg ${wide} min-w-[2.2rem] md:min-w-[2.6rem] ${cls} text-white font-semibold`}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
