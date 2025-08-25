/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        correct: "#6aaa64",   // Wordle green
        present: "#c9b458",   // Wordle yellow
        absent: "#787c7e",    // Wordle gray
      },
    },
  },
  plugins: [],
};
