# Lord of the Rings Trivia# React + TypeScript + Vite



An unofficial fan-made trivia website for testing your knowledge of Middle-earth.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🎯 FeaturesCurrently, two official plugins are available:



- **Flashcard-style UI**: Click cards to flip and reveal answers- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **Smooth animations**: Built with Framer Motion for a polished experience- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Keyboard navigation**: Use arrow keys to navigate, Space/Enter to reveal

- **Progress tracking**: Saves your position using localStorage## React Compiler

- **Responsive design**: Works on desktop and mobile

- **Minimal dependencies**: Simple, clean, and easy to extendThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).



## 🚀 Getting Started## Expanding the ESLint configuration



### PrerequisitesIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:



- Node.js (v18 or higher recommended)```js

- npm or bunexport default defineConfig([

  globalIgnores(['dist']),

### Installation  {

    files: ['**/*.{ts,tsx}'],

```bash    extends: [

# Install dependencies      // Other configs...

npm install

# or      // Remove tseslint.configs.recommended and replace with this

bun install      tseslint.configs.recommendedTypeChecked,

```      // Alternatively, use this for stricter rules

      tseslint.configs.strictTypeChecked,

### Development      // Optionally, add this for stylistic rules

      tseslint.configs.stylisticTypeChecked,

```bash

# Start development server      // Other configs...

npm run dev    ],

# or    languageOptions: {

bun dev      parserOptions: {

```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

Open [http://localhost:5173](http://localhost:5173) to view the app.      },

      // other options...

### Build for Production    },

  },

```bash])

# Build the app```

npm run build

# orYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

bun build

``````js

// eslint.config.js

The production-ready files will be in the `dist/` folder.import reactX from 'eslint-plugin-react-x'

import reactDom from 'eslint-plugin-react-dom'

## 📁 Project Structure

export default defineConfig([

```  globalIgnores(['dist']),

src/  {

├── components/    files: ['**/*.{ts,tsx}'],

│   ├── TriviaCard.tsx      # Animated flashcard component    extends: [

│   ├── TriviaDeck.tsx      # Deck management and navigation      // Other configs...

│   ├── ProgressBar.tsx     # Visual progress indicator      // Enable lint rules for React

│   └── Disclaimer.tsx      # Legal disclaimer      reactX.configs['recommended-typescript'],

├── data/      // Enable lint rules for React DOM

│   └── trivia.sample.json  # Trivia questions data      reactDom.configs.recommended,

├── hooks/    ],

│   └── useTrivia.ts        # Custom hook for trivia state    languageOptions: {

├── types/      parserOptions: {

│   └── trivia.ts           # TypeScript type definitions        project: ['./tsconfig.node.json', './tsconfig.app.json'],

├── App.tsx                 # Main application component        tsconfigRootDir: import.meta.dirname,

├── main.tsx                # Application entry point      },

└── index.css               # Tailwind CSS imports      // other options...

```    },

  },

## ✨ Adding New Trivia])

```

To add new trivia questions, edit `src/data/trivia.sample.json`:# lotr-trivia


```json
{
  "title": "The Lord of the Rings Trivia",
  "description": "Test your knowledge of Middle-earth",
  "questions": [
    {
      "id": "unique-id",
      "question": "Your question here?",
      "answer": "The answer here",
      "category": "Category Name",
      "difficulty": "easy"
    }
  ]
}
```

### Question Fields

- `id` (required): Unique identifier for the question
- `question` (required): The question text
- `answer` (required): The answer text
- `category` (optional): Category tag (e.g., "Characters", "Locations")
- `difficulty` (optional): One of "easy", "medium", or "hard"

## 🎮 Controls

- **Mouse**: Click card to reveal/hide answer, click buttons to navigate
- **Keyboard**:
  - `←/→` or `↑/↓`: Navigate between questions
  - `Space` or `Enter`: Reveal/hide answer

## 🛠 Tech Stack

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Bun**: Fast JavaScript runtime (optional)

## ⚠️ Disclaimer

This is an unofficial fan-made project. The Lord of the Rings and all related content are property of the Tolkien Estate and their respective copyright holders. This site is for educational and entertainment purposes only.

## 📝 License

This project is open source and available for educational purposes.

---

Built with ❤️ by fans, for fans
