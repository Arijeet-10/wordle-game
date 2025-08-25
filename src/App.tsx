import Keyboard from "./Keyboard";
import { useWordle } from "./useWordle";
import type { EvalLetter } from "./type";

function Row({ letters, active, current, len }: {
  letters?: EvalLetter[];
  active?: boolean;
  current?: string;
  len: number;
}) {
  if (letters) {
    return (
      <div className="flex gap-1.5 justify-center">
        {letters.map((l, i) => (
          <div
            key={i}
            className={`
              w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold
              transition-all duration-500 ease-in-out transform
              ${l.state === "correct" 
                ? "bg-green-500 border-green-500 text-white shadow-lg scale-105" 
                : l.state === "present" 
                ? "bg-yellow-500 border-yellow-500 text-white shadow-lg scale-105" 
                : l.state === "absent" 
                ? "bg-gray-600 border-gray-600 text-white shadow-sm" 
                : "bg-gray-800 border-gray-700 text-white"
              }
              hover:border-gray-500 rounded-md
            `}
            style={{
              animationDelay: `${i * 100}ms`
            }}
          >
            {l.ch.toUpperCase()}
          </div>
        ))}
      </div>
    );
  }

  const cells = Array.from({ length: len }, (_, i) => current?.[i] ?? "");
  return (
    <div className="flex gap-1.5 justify-center">
      {cells.map((c, i) => (
        <div 
          key={i} 
          className={`
            w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold
            transition-all duration-200 ease-in-out
            ${c 
              ? "bg-gray-800 border-gray-600 text-white scale-105 shadow-md" 
              : "bg-gray-900 border-gray-700 text-gray-400"
            }
            ${active && i === current?.length ? "border-blue-400 shadow-blue-400/30 shadow-lg" : ""}
            hover:border-gray-500 rounded-md
          `}
        >
          {c.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const {
    rows, current, status, keyboardMap,
    onChar, onDelete, onEnter, reset, shareText, WORD_LEN, MAX_ROWS, solution,
    level, score, nextLevel
  } = useWordle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              WORDLE
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
                <span className="text-gray-400">Level:</span>
                <span className="ml-2 text-blue-400 font-bold">{level}</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
                <span className="text-gray-400">Score:</span>
                <span className="ml-2 text-green-400 font-bold">{score}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareText || "");
                if (!shareText) alert("Finish a game to share!");
                else alert("Result copied to clipboard! 📋");
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105 border border-blue-500/30"
            >
              📤 Share
            </button>
            <button
              onClick={() => reset()}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105 border border-purple-500/30"
            >
              🔄 New Game
            </button>
          </div>
        </header>

        {/* Game Board */}
        <div className="mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-2xl">
            <div className="grid gap-3">
              {Array.from({ length: MAX_ROWS }).map((_, r) => (
                <Row
                  key={r}
                  len={WORD_LEN}
                  letters={rows[r]}
                  active={r === rows.length}
                  current={r === rows.length ? current : ""}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Keyboard */}
        <div className="mb-6">
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            keyStates={keyboardMap}
          />
        </div>

        {/* Game Status */}
        {status !== "playing" && (
          <div className="text-center mb-6">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-xl">
              {status === "won" ? (
                <div className="space-y-4">
                  <div className="text-2xl">🎉</div>
                  <div className="text-xl font-bold text-green-400">Congratulations!</div>
                  <div className="text-gray-300">You solved it!</div>
                  <button
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105 border border-green-500/30"
                    onClick={nextLevel}
                  >
                    🚀 Next Level
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-2xl">😅</div>
                  <div className="text-xl font-bold text-red-400">Game Over</div>
                  <div className="text-gray-300">
                    The word was: <span className="font-bold text-yellow-400">{solution?.toUpperCase()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <footer className="text-center">
          <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30">
            <div className="text-xs text-gray-400 space-y-1">
              <div>🎯 Guess the 5-letter word in 6 tries</div>
              <div>🟩 Green = Correct letter & position</div>
              <div>🟨 Yellow = Correct letter, wrong position</div>
              <div>⬜ Gray = Letter not in word</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}