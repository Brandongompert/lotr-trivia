# Umami Quick Reference

## 🚀 Essential Commands

### Start Umami

```bash
make umami-up
# Or: docker-compose up -d umami umami-db
```

### Stop Umami

```bash
make umami-down
# Or: docker-compose stop umami umami-db
```

### View Logs

```bash
make umami-logs
# Or: docker-compose logs -f umami
```

### Check Status

```bash
make umami-status
# Or: docker-compose ps umami umami-db
```

### Backup Database

```bash
make umami-backup
# Or: docker exec umami-db pg_dump -U umami umami > backup.sql
```

---

## 🔑 Important URLs

- **Umami Dashboard:** `https://analytics.yourdomain.com`
- **Local Development:** `http://localhost:3000`
- **Health Check:** `https://analytics.yourdomain.com/api/heartbeat`

---

## 👤 Default Credentials

**⚠️ Change immediately after first login!**

- **Username:** `admin`
- **Password:** `umami`

---

## 📝 Environment Variables

| Variable                | Example                        | Required |
| ----------------------- | ------------------------------ | -------- |
| `UMAMI_DB_PASSWORD`     | `your_secure_password`         | ✅       |
| `UMAMI_APP_SECRET`      | `random_32_char_string`        | ✅       |
| `VITE_UMAMI_WEBSITE_ID` | `xxx-xxx-xxx-xxx`              | ✅       |
| `VITE_UMAMI_URL`        | `https://analytics.domain.com` | ✅       |

**Generate secrets:**

```bash
openssl rand -base64 32
```

---

## 🎯 First-Time Setup (5 Minutes)

1. **Create `.env`**

   ```bash
   cp .env.example .env
   nano .env  # Fill in values
   ```

2. **Start Services**

   ```bash
   docker-compose up -d
   ```

3. **Configure Nginx**

   ```bash
   sudo cp nginx/umami.conf /etc/nginx/sites-available/analytics.domain.com
   sudo ln -s /etc/nginx/sites-available/analytics.domain.com /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. **Get SSL**

   ```bash
   sudo certbot --nginx -d analytics.domain.com
   ```

5. **Login & Setup**
   - Go to `https://analytics.domain.com`
   - Login: `admin` / `umami`
   - Change password
   - Create website
   - Copy Website ID

6. **Update .env**

   ```bash
   nano .env  # Add VITE_UMAMI_WEBSITE_ID
   ```

7. **Deploy**
   ```bash
   git push  # GitHub Actions will rebuild
   ```

---

## 🐛 Troubleshooting

### Umami won't start

```bash
docker-compose logs umami
# Check: DATABASE_URL, APP_SECRET set?
```

### No tracking data

```bash
# 1. Check browser console for errors
# 2. Verify script loads: View page source
# 3. Check Website ID matches
# 4. Rebuild app with correct env vars
```

### 502 Bad Gateway

```bash
# 1. Is Umami running?
docker-compose ps umami

# 2. Can Nginx reach it?
curl http://127.0.0.1:3000/api/heartbeat

# 3. Check Nginx logs
sudo tail -f /var/log/nginx/analytics-error.log
```

### Database errors

```bash
# Restart database
docker-compose restart umami-db

# Check connection
docker exec -it umami-db psql -U umami -d umami
```

---

## 📚 Full Documentation

- **Complete Guide:** `umami/README.md`
- **GitHub Secrets:** `umami/GITHUB_SECRETS.md`
- **Implementation:** `.implementations/UMAMI-IMPLEMENTATION.md`

---

## ✅ Quick Health Check

```bash
# All should return healthy
docker-compose ps

# Should return: {"ok":true}
curl http://127.0.0.1:3000/api/heartbeat

# Should return 200
curl -I https://analytics.domain.com
```

---

**Need help?** See `umami/README.md` for detailed instructions.
