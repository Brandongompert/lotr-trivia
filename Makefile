.PHONY: help build run stop clean dev test deploy umami-up umami-down umami-logs umami-backup

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
	@echo ""
	@echo "Umami Analytics:"
	@echo "  make umami-up     - Start Umami and database"
	@echo "  make umami-down   - Stop Umami services"
	@echo "  make umami-logs   - View Umami logs"
	@echo "  make umami-backup - Backup Umami database"
	@echo "  make umami-status - Check Umami status"

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

# Umami Analytics commands
umami-up:
	docker-compose up -d umami umami-db
	@echo "⏳ Waiting for Umami to start..."
	@sleep 10
	@echo "✅ Umami is running on http://localhost:3000"
	@echo "   Default login: admin / umami"
	@echo "   ⚠️  Change the password immediately!"

umami-down:
	docker-compose stop umami umami-db

umami-logs:
	docker-compose logs -f umami

umami-backup:
	@echo "Creating Umami database backup..."
	@mkdir -p ./backups
	@docker exec umami-db pg_dump -U umami umami > ./backups/umami-backup-$(shell date +%Y%m%d-%H%M%S).sql
	@echo "✅ Backup created in ./backups/"

umami-status:
	@echo "Umami Services Status:"
	@docker-compose ps umami umami-db
