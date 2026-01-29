# Deployment Guide - LOTR Trivia

## 🐳 Docker Deployment

### Local Docker Build & Run

```bash
# Build the Docker image
docker build -t lotr-trivia:local .

# Run the container
docker run -d -p 8080:80 --name lotr-trivia lotr-trivia:local

# View logs
docker logs -f lotr-trivia

# Stop and remove
docker stop lotr-trivia
docker rm lotr-trivia
```

Visit: http://localhost:8080

### Using Docker Compose (Recommended for VPS)

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down

# Update to latest image
docker-compose pull
docker-compose up -d
```

---

## 🚀 GitHub Actions CI/CD

### Setup

1. **Enable GitHub Container Registry**
   - Go to repository Settings → Actions → General
   - Scroll to "Workflow permissions"
   - Select "Read and write permissions"
   - Save

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Add Docker deployment"
   git push origin main
   ```

3. **GitHub Actions will automatically:**
   - Build the React app
   - Create a Docker image
   - Push to `ghcr.io/brandongompert/lotr-trivia`
   - Tag with `latest` and git SHA

### Accessing the Image

```bash
# Login to GHCR
echo $GITHUB_PAT | docker login ghcr.io -u USERNAME --password-stdin

# Pull the image
docker pull ghcr.io/brandongompert/lotr-trivia:latest

# Run it
docker run -d -p 8080:80 ghcr.io/brandongompert/lotr-trivia:latest
```

**Note:** For public images, login is not required for pulling.

---

## 🖥️ VPS Deployment

### Prerequisites
- VPS with Docker and docker-compose installed
- Domain name pointed to VPS (optional)
- Reverse proxy with SSL (Traefik, Caddy, or Nginx Proxy Manager)

### Deployment Steps

1. **SSH into your VPS**
   ```bash
   ssh user@your-vps-ip
   ```

2. **Create project directory**
   ```bash
   mkdir -p ~/apps/lotr-trivia
   cd ~/apps/lotr-trivia
   ```

3. **Create docker-compose.yml**
   ```bash
   curl -o docker-compose.yml https://raw.githubusercontent.com/Brandongompert/lotr-trivia/main/docker-compose.yml
   ```
   
   Or manually create with this content:
   ```yaml
   version: '3.8'

   services:
     lotr-trivia:
       image: ghcr.io/brandongompert/lotr-trivia:latest
       container_name: lotr-trivia
       restart: unless-stopped
       ports:
         - "8080:80"
       healthcheck:
         test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
         interval: 30s
         timeout: 3s
         retries: 3
         start_period: 5s
   ```

4. **Start the service**
   ```bash
   docker-compose up -d
   ```

5. **Verify it's running**
   ```bash
   docker-compose ps
   curl http://localhost:8080
   ```

### With Reverse Proxy (Recommended)

If using Traefik, Caddy, or Nginx Proxy Manager:

```yaml
version: '3.8'

services:
  lotr-trivia:
    image: ghcr.io/brandongompert/lotr-trivia:latest
    container_name: lotr-trivia
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.lotr-trivia.rule=Host(`trivia.yourdomain.com`)"
      - "traefik.http.routers.lotr-trivia.entrypoints=websecure"
      - "traefik.http.routers.lotr-trivia.tls.certresolver=letsencrypt"
    networks:
      - web

networks:
  web:
    external: true
```

---

## 🔄 Updating the Deployment

### On VPS

```bash
cd ~/apps/lotr-trivia

# Pull latest image
docker-compose pull

# Restart with new image
docker-compose up -d

# Clean up old images
docker image prune -f
```

### Automated Updates (Optional)

Use Watchtower to auto-update containers:

```yaml
version: '3.8'

services:
  lotr-trivia:
    image: ghcr.io/brandongompert/lotr-trivia:latest
    container_name: lotr-trivia
    restart: unless-stopped
    ports:
      - "8080:80"
    labels:
      - "com.centurylinklabs.watchtower.enable=true"

  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 300 --cleanup
```

---

## 📊 Monitoring & Logs

### View Logs
```bash
# Real-time logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Specific service
docker-compose logs -f lotr-trivia
```

### Health Check
```bash
# Check container health
docker inspect lotr-trivia | grep -A 10 Health

# Manual health check
curl -f http://localhost:8080 || echo "Service is down"
```

---

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs

# Inspect container
docker inspect lotr-trivia

# Restart
docker-compose restart
```

### Port already in use
```bash
# Change port in docker-compose.yml
ports:
  - "8081:80"  # Use different host port
```

### Image won't pull
```bash
# Login to GHCR
echo $GITHUB_PAT | docker login ghcr.io -u USERNAME --password-stdin

# Pull manually
docker pull ghcr.io/brandongompert/lotr-trivia:latest
```

### Clear cache and rebuild
```bash
# Remove old images
docker-compose down
docker rmi ghcr.io/brandongompert/lotr-trivia:latest

# Pull fresh
docker-compose pull
docker-compose up -d
```

---

## 🔒 Security Notes

1. **Nginx Configuration**
   - Security headers included in nginx.conf
   - Gzip compression enabled
   - No sensitive data in container

2. **Container Security**
   - Uses official Nginx Alpine image (minimal attack surface)
   - No root processes
   - Health checks enabled

3. **GitHub Actions**
   - Uses GitHub's built-in GITHUB_TOKEN
   - No external secrets required
   - Automated security updates via Dependabot (recommended)

---

## 📝 Environment-Specific Notes

### Production Checklist
- [ ] Configure reverse proxy with SSL
- [ ] Set up domain name
- [ ] Enable firewall rules
- [ ] Configure monitoring (Uptime Kuma, etc.)
- [ ] Set up automated backups (if needed)
- [ ] Configure log rotation
- [ ] Test health checks
- [ ] Document runbook

### Development
- Use `docker build -t lotr-trivia:dev .` for local testing
- Mount source for live reload (not in production)

---

## 📦 Image Details

**Registry:** ghcr.io/brandongompert/lotr-trivia  
**Tags:**
- `latest` - Latest build from main branch
- `<git-sha>` - Specific commit (e.g., `abc1234`)

**Size:** ~25-30MB (Alpine-based)

**Architecture:** linux/amd64

---

Built with ❤️ for easy deployment
