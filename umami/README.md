# Umami Analytics Setup Guide

## Overview

This project integrates **Umami Analytics** - a privacy-focused, open-source analytics solution running in Docker alongside the LOTR Trivia app.

### Architecture

- **Umami**: Self-hosted analytics dashboard
- **PostgreSQL**: Database for Umami
- **Nginx**: Reverse proxy exposing Umami on subdomain
- **Docker Network**: All containers on same private network
- **Security**: Umami only accessible via Nginx, no direct internet exposure

---

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Domain with DNS configured (e.g., `analytics.yourdomain.com`)
- Nginx installed on host
- SSL certificate (via Certbot/Let's Encrypt)

---

## 📋 Step-by-Step Setup

### 1. Create Environment File

```bash
# Copy the example file
cp .env.example .env

# Generate a secure database password
openssl rand -base64 32

# Generate an app secret
openssl rand -base64 32

# Edit .env and fill in the values
nano .env
```

**Required values in `.env`:**

```bash
UMAMI_DB_PASSWORD=your_secure_db_password_here
UMAMI_APP_SECRET=your_random_app_secret_here
```

---

### 2. Start Docker Containers

```bash
# Start all services
docker-compose up -d

# Verify containers are running
docker-compose ps

# Check logs
docker-compose logs -f umami
docker-compose logs -f umami-db
```

**Expected output:**

```
NAME         IMAGE                                        STATUS
lotr-trivia  ghcr.io/brandongompert/lotr-trivia:latest   Up 2 minutes (healthy)
umami        ghcr.io/umami-software/umami:postgresql...   Up 2 minutes (healthy)
umami-db     postgres:15-alpine                           Up 2 minutes (healthy)
```

---

### 3. Configure Nginx (Host)

```bash
# Copy the configuration file to Nginx sites
sudo cp nginx/umami.conf /etc/nginx/sites-available/analytics.yourdomain.com

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/analytics.yourdomain.com /etc/nginx/sites-enabled/

# Edit and replace 'yourdomain.com' with your actual domain
sudo nano /etc/nginx/sites-enabled/analytics.yourdomain.com

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

### 4. Obtain SSL Certificate

```bash
# Install Certbot (if not already installed)
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate for analytics subdomain
sudo certbot --nginx -d analytics.yourdomain.com

# Certbot will automatically update the Nginx config with SSL settings
```

---

### 5. Create Umami Admin Account

**First-time login:**

1. Navigate to `https://analytics.yourdomain.com`
2. Default credentials:
   - **Username:** `admin`
   - **Password:** `umami`

**IMPORTANT:** Change the password immediately!

3. Click on your username (top right) → **Profile** → **Change password**

---

### 6. Create a Website in Umami

1. Go to **Settings** → **Websites**
2. Click **Add website**
3. Fill in details:
   - **Name:** `LOTR Trivia`
   - **Domain:** `yourdomain.com` (your actual domain)
   - **Enable:** ✅ Share URL
4. Click **Save**
5. **Copy the Website ID** (you'll need this next)

---

### 7. Configure Frontend Tracking

Update your `.env` file:

```bash
# Add these lines to .env
VITE_UMAMI_WEBSITE_ID=your-website-id-from-step-6
VITE_UMAMI_URL=https://analytics.yourdomain.com
```

---

### 8. Rebuild and Deploy App

```bash
# Rebuild the Docker image with environment variables
docker build \
  --build-arg VITE_UMAMI_WEBSITE_ID=${VITE_UMAMI_WEBSITE_ID} \
  --build-arg VITE_UMAMI_URL=${VITE_UMAMI_URL} \
  -t ghcr.io/brandongompert/lotr-trivia:latest .

# Or if using GitHub Actions, push to trigger CI/CD
git add .
git commit -m "Add Umami analytics"
git push

# Restart the app container
docker-compose restart lotr-trivia
```

---

### 9. Verify Tracking Works

1. Open your website in a browser: `https://yourdomain.com`
2. Navigate around (answer questions, flip cards)
3. Go to Umami dashboard: `https://analytics.yourdomain.com`
4. Click on **LOTR Trivia** website
5. You should see **Realtime** visitors and **Page views**

**Note:** It may take 1-2 minutes for data to appear.

---

## 🔧 Configuration Details

### Docker Compose Services

**umami-db** (PostgreSQL)

- Image: `postgres:15-alpine`
- Port: Not exposed externally
- Volume: `umami-db-data` (persistent)
- Network: `lotr-network` (private)

**umami** (Analytics App)

- Image: `ghcr.io/umami-software/umami:postgresql-latest`
- Port: `127.0.0.1:3000` (localhost only)
- Depends on: `umami-db`
- Network: `lotr-network` (private)

**lotr-trivia** (React App)

- Image: `ghcr.io/brandongompert/lotr-trivia:latest`
- Port: `8080:80`
- Network: `lotr-network` (private)

---

## 🔐 Security Checklist

- ✅ Umami only binds to `127.0.0.1` (not accessible from internet)
- ✅ PostgreSQL has no exposed ports
- ✅ All containers on private Docker network
- ✅ Nginx reverse proxy with HTTPS
- ✅ Environment variables for secrets
- ✅ `.env` file not committed to Git
- ✅ Admin password changed from default
- ✅ Real IP forwarding (if behind Cloudflare)

---

## 🌐 Cloudflare Integration

If using Cloudflare as CDN/proxy:

### Option 1: Analytics on Cloudflare (Recommended)

- Create DNS record: `analytics.yourdomain.com` → Your server IP
- **Proxy status:** ☁️ Proxied (orange cloud)
- SSL/TLS mode: **Full (strict)**

### Option 2: Analytics NOT on Cloudflare (Direct)

- **Proxy status:** ☁️ DNS only (grey cloud)
- Certificate: Managed by Certbot

### Real IP Configuration

Uncomment the `set_real_ip_from` directives in `nginx/umami.conf` to get accurate visitor IPs.

---

## 🛠️ Common Tasks

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f umami
docker-compose logs -f umami-db
```

### Restart Services

```bash
# All services
docker-compose restart

# Specific service
docker-compose restart umami
```

### Stop Services

```bash
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v
```

### Backup Database

```bash
# Create backup
docker exec umami-db pg_dump -U umami umami > umami-backup-$(date +%Y%m%d).sql

# Restore backup
cat umami-backup-20260131.sql | docker exec -i umami-db psql -U umami umami
```

### Update Umami

```bash
# Pull latest image
docker-compose pull umami

# Restart with new image
docker-compose up -d umami
```

---

## 📊 Features & Usage

### What Umami Tracks

- ✅ Page views
- ✅ Unique visitors
- ✅ Referrers
- ✅ Browser/OS/Device
- ✅ Countries (via IP)
- ✅ Custom events (if configured)

### What Umami Does NOT Track

- ❌ Personal information
- ❌ Cookies (privacy-friendly)
- ❌ IP addresses (hashed)
- ❌ Cross-site tracking

### Privacy Compliance

- ✅ GDPR compliant
- ✅ No cookies required
- ✅ Self-hosted (you own the data)
- ✅ Cookieless tracking

---

## 🐛 Troubleshooting

### Umami won't start

```bash
# Check logs
docker-compose logs umami

# Common issues:
# 1. Database not ready - wait 30 seconds and check again
# 2. APP_SECRET not set - check .env file
# 3. Port 3000 already in use - change port in docker-compose.yml
```

### No data showing in dashboard

```bash
# 1. Check if script is loaded
# Open browser console on your website
# Look for network request to: https://analytics.yourdomain.com/umami.js

# 2. Verify environment variables
cat .env | grep VITE_UMAMI

# 3. Check if website ID is correct
# Login to Umami → Settings → Websites → Copy ID

# 4. Rebuild app with environment variables
docker build --build-arg VITE_UMAMI_WEBSITE_ID=xxx --build-arg VITE_UMAMI_URL=xxx -t app .
```

### 502 Bad Gateway from Nginx

```bash
# 1. Check Umami is running
docker-compose ps umami

# 2. Check if port 3000 is listening
curl http://127.0.0.1:3000/api/heartbeat

# 3. Check Nginx error logs
sudo tail -f /var/log/nginx/analytics-error.log
```

### Database connection errors

```bash
# Check PostgreSQL is running
docker-compose ps umami-db

# Test database connection
docker exec -it umami-db psql -U umami -d umami

# If connection fails, check DATABASE_URL in docker-compose.yml
```

---

## 🔄 Updating Environment Variables

If you need to change Website ID or URL after initial setup:

```bash
# 1. Edit .env file
nano .env

# 2. Rebuild app image
docker build \
  --build-arg VITE_UMAMI_WEBSITE_ID=${VITE_UMAMI_WEBSITE_ID} \
  --build-arg VITE_UMAMI_URL=${VITE_UMAMI_URL} \
  -t ghcr.io/brandongompert/lotr-trivia:latest .

# 3. Restart services
docker-compose up -d
```

---

## 📁 File Structure

```
/
├── docker-compose.yml          # All services defined here
├── .env                        # Your secrets (not committed)
├── .env.example                # Template for environment variables
├── nginx/
│   └── umami.conf              # Host Nginx configuration
├── umami/
│   └── README.md               # This file
├── Dockerfile                  # App build config
└── index.html                  # Umami script injected here
```

---

## 🚀 Production Best Practices

1. **Use strong passwords**
   - Generate with: `openssl rand -base64 32`

2. **Enable automatic backups**
   - Set up cron job for `pg_dump`

3. **Monitor resource usage**
   - Check with: `docker stats`

4. **Keep images updated**
   - Monthly: `docker-compose pull && docker-compose up -d`

5. **Enable Cloudflare**
   - DDoS protection
   - CDN caching
   - Real IP forwarding

6. **Set up alerts**
   - Monitoring for container health
   - Disk space warnings

---

## 📚 Additional Resources

- [Umami Documentation](https://umami.is/docs)
- [Umami GitHub](https://github.com/umami-software/umami)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Nginx Reverse Proxy Guide](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

---

## ✅ Success Checklist

- [ ] `.env` file created with secure passwords
- [ ] Docker containers running and healthy
- [ ] Nginx configuration deployed on host
- [ ] SSL certificate obtained and configured
- [ ] Umami accessible at `https://analytics.yourdomain.com`
- [ ] Admin password changed from default
- [ ] Website created in Umami dashboard
- [ ] Website ID added to `.env` file
- [ ] App rebuilt with environment variables
- [ ] Tracking script visible in browser
- [ ] Data appearing in Umami dashboard

---

**🎉 Congratulations!** You now have privacy-friendly analytics running on your LOTR Trivia app!
