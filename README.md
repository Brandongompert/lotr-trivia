# Lord of the Rings Trivia

An unofficial fan-made trivia website for testing your knowledge of Middle-earth. Built with React, TypeScript, and Tailwind CSS, featuring animated flashcards and containerized deployment.

[![Docker Build](https://github.com/Brandongompert/lotr-trivia/actions/workflows/docker.yml/badge.svg)](https://github.com/Brandongompert/lotr-trivia/actions/workflows/docker.yml)

## ✨ Features

- 🃏 **Flashcard-style UI** - Click cards to flip and reveal answers
- 🎬 **Smooth animations** - Built with Framer Motion for polished interactions
- ⌨️ **Keyboard navigation** - Arrow keys, Space, and Enter support
- 💾 **Progress tracking** - Automatically saves your position using localStorage
- 📱 **Responsive design** - Works seamlessly on desktop and mobile
- 🐳 **Docker ready** - Production-ready containerized deployment
- 🚀 **CI/CD pipeline** - Automated builds via GitHub Actions → GHCR

## 🚀 Quick Start

### Prerequisites

- **Node.js** v20.19+ or v22.12+ (required for Vite)
- **npm** or **bun**

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/Brandongompert/lotr-trivia.git
cd lotr-trivia

# Install dependencies
npm install  # or: bun install

# Start development server
npm run dev  # or: bun dev
```

Visit: **http://localhost:5173**

### Production Build

```bash
npm run build  # or: bun build
```

Build output will be in the `dist/` folder.

## 🐳 Docker Deployment

### Quick Start

```bash
# Using pre-built image from GitHub Container Registry
docker pull ghcr.io/brandongompert/lotr-trivia:latest
docker run -d -p 8080:80 ghcr.io/brandongompert/lotr-trivia:latest

# Or build locally
docker build -t lotr-trivia .
docker run -d -p 8080:80 lotr-trivia
```

Visit: **http://localhost:8080**

### Using Make Commands

```bash
make help          # Show all available commands
make deploy-local  # Build and run locally
make up            # Start with docker-compose
make logs          # View container logs
make down          # Stop services
```

**📘 For complete deployment instructions** (VPS setup, reverse proxy configuration, CI/CD, monitoring, troubleshooting), see **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)**.

## 📁 Project Structure

```
lotr-trivia/
├── src/
│   ├── components/         # React components (TriviaCard, TriviaDeck, etc.)
│   ├── data/              # trivia.sample.json (8 LOTR questions)
│   ├── hooks/             # useTrivia.ts (state management)
│   ├── types/             # TypeScript definitions
│   └── App.tsx            # Main application
├── docs/
│   ├── DEPLOYMENT.md      # 📘 Complete deployment guide
│   └── DESIGN.md          # 🎨 UI/UX design documentation
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Docker Compose config
├── nginx.conf             # Production server config
└── Makefile               # Development commands
```

## ✏️ Adding New Trivia Questions

Edit `src/data/trivia.sample.json`:

```json
{
  "questions": [
    {
      "id": "unique-id",
      "question": "Your question here?",
      "answer": "The answer here",
      "category": "Category Name", // optional
      "difficulty": "easy" // optional: easy, medium, hard
    }
  ]
}
```

## 🎮 Controls

- **Mouse/Touch:** Click card to flip, click buttons to navigate
- **Keyboard:**
  - `← / →` or `↑ / ↓` - Navigate questions
  - `Space` or `Enter` - Reveal/hide answer
  - `Tab` - Navigate buttons

**🎨 For detailed UI/UX information** (color scheme, animations, interactions, visual design), see **[docs/DESIGN.md](./docs/DESIGN.md)**.

## 🛠 Tech Stack

### Frontend

- **React 19** - Functional components and hooks
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations

### DevOps

- **Docker** - Containerization
- **Nginx Alpine** - Web server (~61MB image)
- **GitHub Actions** - CI/CD
- **GHCR** - Container registry

## 🚀 CI/CD

Every push to `main` triggers GitHub Actions to:

1. Build Docker image (includes app compilation)
2. Tag with `latest` and git SHA
3. Push to `ghcr.io/brandongompert/lotr-trivia`

**Available tags:**

- `latest` - Most recent build
- `<git-sha>` - Specific commit

Check build status in the [Actions tab](https://github.com/Brandongompert/lotr-trivia/actions).

## 📚 Documentation

| Document                                                      | Description                                                        |
| ------------------------------------------------------------- | ------------------------------------------------------------------ |
| **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)**                     | Complete deployment guide (Docker, VPS, reverse proxy, monitoring) |
| **[DESIGN.md](./docs/DESIGN.md)**                             | UI/UX design guide, color scheme, animations, interactions         |
| **[IMPLEMENTATION.md](./.implementations/IMPLEMENTATION.md)** | Technical implementation details                                   |
| **[DEVOPS-SUMMARY.md](./.implementations/DEVOPS-SUMMARY.md)** | DevOps setup and workflow summary                                  |

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Docker (via Makefile)
make help            # Show all commands
make build           # Build Docker image
make run             # Run container
make stop            # Stop container
make test            # Build and test
make deploy-local    # Build and run locally
make up              # Start docker-compose
make down            # Stop docker-compose
make logs            # View logs
make update          # Pull latest and restart
```

## ⚠️ Disclaimer

This is an **unofficial fan-made project**. _The Lord of the Rings_ and all related characters, locations, and lore are the property of the Tolkien Estate and/or their respective copyright holders.

This website is created purely for **educational and entertainment purposes** and is not affiliated with, endorsed by, or connected to J.R.R. Tolkien, the Tolkien Estate, Middle-earth Enterprises, or any official _Lord of the Rings_ entities.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add more trivia questions
- Improve animations or UI
- Fix bugs or typos
- Enhance documentation

## 🙏 Acknowledgments

Built with ❤️ by fans, for fans. Inspired by the legendary works of J.R.R. Tolkien.

---

**Ready to test your knowledge of Middle-earth?** 🧙‍♂️
