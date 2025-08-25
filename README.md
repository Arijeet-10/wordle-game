# Wordle Game (React + TypeScript)

This is a clone of the popular Wordle game built with React, TypeScript, and Vite.

# Description
This project is a web-based word-guessing game where players try to guess a five-letter word within six attempts. The game provides feedback on each guess, indicating correct letters in the correct position (green), correct letters in the wrong position (yellow), and incorrect letters (gray). It also includes features like different levels and a scoring system to enhance the user experience.

## Features
- Classic Wordle gameplay: guess the 5-letter word in 6 tries
- Responsive design for desktop and mobile
- On-screen and physical keyboard support
- Level and score tracking
- Hint system (optional, can be enabled/disabled)
- Animated tiles and modern UI
- Easy to customize word lists

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
git clone https://github.com/Arijeet-10/wordle-game.git
cd wordle-game
npm install
# or
yarn install
```

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
# or
yarn build
```

## Project Structure
```
wordle-game/
├── public/           # Static assets (favicon, etc.)
├── src/              # Source code
│   ├── App.tsx       # Main app component
│   ├── Keyboard.tsx  # On-screen keyboard
│   ├── useWordle.ts  # Game logic hook
│   ├── words.ts      # Word lists
│   └── ...
├── index.html        # HTML entry point
├── tailwind.config.js
├── vite.config.ts
└── ...
```

## Customization
- To change the word list, edit `src/words.ts`.
- To adjust game rules (word length, attempts), edit `src/useWordle.ts`.
- UI and theme can be customized via Tailwind classes in the components.

## Credits
- Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html)
- Built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [Vite](https://vitejs.dev/)


