import Keyboard from "./Keyboard";
import { useWordle } from "./useWordle";
import type { EvalLetter } from "./type";
import { useState, useEffect } from "react";

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
    level, score, nextLevel,
    hintUsed, useHint
  } = useWordle();

  const [showRules, setShowRules] = useState(true);
  useEffect(() => { setShowRules(true); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-[#181818] rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-gray-700 relative animate-fade-in text-white">
            <button
              className="absolute top-4 right-5 text-gray-300 hover:text-white text-3xl font-bold"
              onClick={() => setShowRules(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-3xl font-extrabold mb-2">How To Play</h2>
            <div className="text-lg mb-2">Guess the Wordle in 6 tries.</div>
            <ul className="list-disc pl-6 mb-6 text-base">
              <li>Each guess must be a valid 5-letter word.</li>
              <li>The color of the tiles will change to show how close your guess was to the word.</li>
            </ul>
            <div className="font-bold mb-2 text-xl">Examples</div>
            <div className="mb-3">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-green-600 border-2 border-green-700 text-white">W</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">O</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">R</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">D</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">Y</div>
              </div>
              <div className="ml-1 mt-1 text-base"><b>W</b> is in the word and in the correct spot.</div>
            </div>
            <div className="mb-3">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">L</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-yellow-400 border-2 border-yellow-500 text-black">I</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">G</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">H</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">T</div>
              </div>
              <div className="ml-1 mt-1 text-base"><b>I</b> is in the word but in the wrong spot.</div>
            </div>
            <div className="mb-3">
              <div className="flex gap-1 mb-1">
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">R</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">O</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">G</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">U</div>
                <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-gray-900 border-2 border-gray-700 text-white">E</div>
              </div>
              <div className="ml-1 mt-1 text-base"><b>U</b> is not in the word in any spot.</div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto px-4 py-6">
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
              onClick={() => setShowRules(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 border border-cyan-500/30"
            >
              ❓ How to Play
            </button>
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
            <button
              onClick={useHint}
              disabled={hintUsed || status !== "playing"}
              className={`bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 hover:scale-105 border border-yellow-500/30 ${hintUsed || status !== "playing" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              💡 Hint
            </button>
          </div>
        </header>

        {/* Game Board and Keyboard Side by Side */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start mb-8">
          <div className="flex-1">
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
          <div className="flex-1 flex justify-center">
            <div>
              <Keyboard
                onChar={onChar}
                onDelete={onDelete}
                onEnter={onEnter}
                keyStates={keyboardMap}
              />
            </div>
          </div>
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
        
      </div>
    </div>
  );
}