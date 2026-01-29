# Lord of the Rings Trivia# Lord of the Rings Trivia# React + TypeScript + Vite

An unofficial fan-made trivia website for testing your knowledge of Middle-earth.

## 🎯 FeaturesAn unofficial fan-made trivia website for testing your knowledge of Middle-earth.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

- **Flashcard-style UI**: Click cards to flip and reveal answers

- **Smooth animations**: Built with Framer Motion for a polished experience

- **Keyboard navigation**: Use arrow keys to navigate, Space/Enter to reveal## 🎯 FeaturesCurrently, two official plugins are available:

- **Progress tracking**: Saves your position using localStorage

- **Responsive design**: Works on desktop and mobile

- **Minimal dependencies**: Simple, clean, and easy to extend

- **Docker ready**: Production-ready containerized deployment- **Flashcard-style UI**: Click cards to flip and reveal answers- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

## 🚀 Getting Started- **Smooth animations**: Built with Framer Motion for a polished experience- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Prerequisites- **Keyboard navigation**: Use arrow keys to navigate, Space/Enter to reveal

- Node.js (v20.19+ or v22.12+ recommended)- **Progress tracking**: Saves your position using localStorage## React Compiler

- npm or bun

- **Responsive design**: Works on desktop and mobile

### Installation

- **Minimal dependencies**: Simple, clean, and easy to extendThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

```bash

# Install dependencies

npm install

# or## 🚀 Getting Started## Expanding the ESLint configuration

bun install

```

### Development### PrerequisitesIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````bash

# Start development server

npm run dev- Node.js (v18 or higher recommended)```js

# or

bun dev- npm or bunexport default defineConfig([

````

globalIgnores(['dist']),

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Installation {

### Build for Production

    files: ['**/*.{ts,tsx}'],

```````bash

# Build the app```bash    extends: [

npm run build

# or# Install dependencies      // Other configs...

bun build

```npm install



The production-ready files will be in the `dist/` folder.# or      // Remove tseslint.configs.recommended and replace with this



## 🐳 Docker Deploymentbun install      tseslint.configs.recommendedTypeChecked,



### Quick Start with Docker```      // Alternatively, use this for stricter rules



```bash      tseslint.configs.strictTypeChecked,

# Build the image

docker build -t lotr-trivia .### Development      // Optionally, add this for stylistic rules



# Run the container      tseslint.configs.stylisticTypeChecked,

docker run -d -p 8080:80 lotr-trivia

``````bash



Visit: http://localhost:8080# Start development server      // Other configs...



### Using Makefile (Recommended)npm run dev    ],



```bash# or    languageOptions: {

# See all commands

make helpbun dev      parserOptions: {



# Build and run locally```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

make deploy-local

        tsconfigRootDir: import.meta.dirname,

# Start with docker-compose

make upOpen [http://localhost:5173](http://localhost:5173) to view the app.      },



# View logs      // other options...

make logs

### Build for Production    },

# Stop

make down  },

```````

```````bash])

### Using Docker Compose

# Build the app```

```bash

# Start the servicenpm run build

docker-compose up -d

# orYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

# View logs

docker-compose logs -fbun build



# Stop the service``````js

docker-compose down

```// eslint.config.js



See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.The production-ready files will be in the `dist/` folder.import reactX from 'eslint-plugin-react-x'



## 📁 Project Structureimport reactDom from 'eslint-plugin-react-dom'



```## 📁 Project Structure

src/

├── components/export default defineConfig([

│   ├── TriviaCard.tsx      # Animated flashcard component

│   ├── TriviaDeck.tsx      # Deck management and navigation```  globalIgnores(['dist']),

│   ├── ProgressBar.tsx     # Visual progress indicator

│   └── Disclaimer.tsx      # Legal disclaimersrc/  {

├── data/

│   └── trivia.sample.json  # Trivia questions data├── components/    files: ['**/*.{ts,tsx}'],

├── hooks/

│   └── useTrivia.ts        # Custom hook for trivia state│   ├── TriviaCard.tsx      # Animated flashcard component    extends: [

├── types/

│   └── trivia.ts           # TypeScript type definitions│   ├── TriviaDeck.tsx      # Deck management and navigation      // Other configs...

├── App.tsx                 # Main application component

├── main.tsx                # Application entry point│   ├── ProgressBar.tsx     # Visual progress indicator      // Enable lint rules for React

└── index.css               # Tailwind CSS imports

```│   └── Disclaimer.tsx      # Legal disclaimer      reactX.configs['recommended-typescript'],



## ✨ Adding New Trivia├── data/      // Enable lint rules for React DOM



To add new trivia questions, edit `src/data/trivia.sample.json`:│   └── trivia.sample.json  # Trivia questions data      reactDom.configs.recommended,



```json├── hooks/    ],

{

  "title": "The Lord of the Rings Trivia",│   └── useTrivia.ts        # Custom hook for trivia state    languageOptions: {

  "description": "Test your knowledge of Middle-earth",

  "questions": [├── types/      parserOptions: {

    {

      "id": "unique-id",│   └── trivia.ts           # TypeScript type definitions        project: ['./tsconfig.node.json', './tsconfig.app.json'],

      "question": "Your question here?",

      "answer": "The answer here",├── App.tsx                 # Main application component        tsconfigRootDir: import.meta.dirname,

      "category": "Category Name",

      "difficulty": "easy"├── main.tsx                # Application entry point      },

    }

  ]└── index.css               # Tailwind CSS imports      // other options...

}

``````    },



### Question Fields  },



- `id` (required): Unique identifier for the question## ✨ Adding New Trivia])

- `question` (required): The question text

- `answer` (required): The answer text```

- `category` (optional): Category tag (e.g., "Characters", "Locations")

- `difficulty` (optional): One of "easy", "medium", or "hard"To add new trivia questions, edit `src/data/trivia.sample.json`:# lotr-trivia



## 🎮 Controls

```json

- **Mouse**: Click card to reveal/hide answer, click buttons to navigate{

- **Keyboard**:  "title": "The Lord of the Rings Trivia",

  - `←/→` or `↑/↓`: Navigate between questions  "description": "Test your knowledge of Middle-earth",

  - `Space` or `Enter`: Reveal/hide answer  "questions": [

    {

## 🛠 Tech Stack      "id": "unique-id",

      "question": "Your question here?",

- **React 19**: UI framework      "answer": "The answer here",

- **TypeScript**: Type safety      "category": "Category Name",

- **Vite**: Build tool and dev server      "difficulty": "easy"

- **Tailwind CSS v4**: Styling    }

- **Framer Motion**: Animations  ]

- **Bun**: Fast JavaScript runtime (optional)}

- **Docker**: Containerization```

- **Nginx**: Production web server

- **GitHub Actions**: CI/CD pipeline### Question Fields



## 🚀 CI/CD- `id` (required): Unique identifier for the question

- `question` (required): The question text

This project uses GitHub Actions to automatically:- `answer` (required): The answer text

- `category` (optional): Category tag (e.g., "Characters", "Locations")

1. Build the React application- `difficulty` (optional): One of "easy", "medium", or "hard"

2. Create a Docker image

3. Push to GitHub Container Registry (GHCR)## 🎮 Controls



Images are available at: `ghcr.io/brandongompert/lotr-trivia`- **Mouse**: Click card to reveal/hide answer, click buttons to navigate

- **Keyboard**:

See [DEPLOYMENT.md](./DEPLOYMENT.md) for VPS deployment instructions.  - `←/→` or `↑/↓`: Navigate between questions

  - `Space` or `Enter`: Reveal/hide answer

## 📚 Documentation

## 🛠 Tech Stack

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide

- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Implementation details- **React 19**: UI framework

- [DESIGN.md](./DESIGN.md) - UI/UX design guide- **TypeScript**: Type safety

- **Vite**: Build tool and dev server

## ⚠️ Disclaimer- **Tailwind CSS**: Styling

- **Framer Motion**: Animations

This is an unofficial fan-made project. The Lord of the Rings and all related content are property of the Tolkien Estate and their respective copyright holders. This site is for educational and entertainment purposes only.- **Bun**: Fast JavaScript runtime (optional)



## 📝 License## ⚠️ Disclaimer



This project is open source and available for educational purposes.This is an unofficial fan-made project. The Lord of the Rings and all related content are property of the Tolkien Estate and their respective copyright holders. This site is for educational and entertainment purposes only.



---## 📝 License



Built with ❤️ by fans, for fansThis project is open source and available for educational purposes.


---

Built with ❤️ by fans, for fans
```````
