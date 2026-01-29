.PHONY: help build run stop clean dev test deploy

help:
	@echo "LOTR Trivia - Docker Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start Vite development server"
	@echo "  make build-app    - Build the React app"
	@echo ""
	@echo "Docker:"
	@echo "  make build        - Build Docker image"
	@echo "  make run          - Run container on port 8080"
	@echo "  make stop         - Stop and remove container"
	@echo "  make clean        - Remove image and container"
	@echo "  make test         - Build and test locally"
	@echo ""
	@echo "Docker Compose:"
	@echo "  make up           - Start with docker-compose"
	@echo "  make down         - Stop docker-compose"
	@echo "  make logs         - View logs"
	@echo "  make update       - Pull latest image and restart"

# Development
dev:
	bun dev

build-app:
	bun run build

# Docker
build:
	docker build -t lotr-trivia:local .

run:
	docker run -d -p 8080:80 --name lotr-trivia lotr-trivia:local

stop:
	docker stop lotr-trivia || true
	docker rm lotr-trivia || true

clean: stop
	docker rmi lotr-trivia:local || true

test: build run
	@echo "Waiting for container to start..."
	@sleep 3
	@echo "Testing endpoint..."
	@curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 | grep -q 200 && echo "✅ Container is running!" || echo "❌ Container failed to start"
	@make stop

# Docker Compose
up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

update:
	docker-compose pull
	docker-compose up -d

# Combined commands
deploy-local: build run
	@echo "✅ Deployed locally on http://localhost:8080"
