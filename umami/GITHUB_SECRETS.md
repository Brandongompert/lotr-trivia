# GitHub Secrets Configuration

To build the Docker image with Umami analytics via GitHub Actions, you need to add the following secrets to your GitHub repository.

## Required Secrets

Go to: **Repository Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### 1. VITE_UMAMI_WEBSITE_ID

- **Name:** `VITE_UMAMI_WEBSITE_ID`
- **Value:** Your website ID from Umami dashboard (e.g., `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
- **How to get:**
  1. Login to Umami: `https://analytics.yourdomain.com`
  2. Go to **Settings** → **Websites**
  3. Click on your website
  4. Copy the **Website ID**

### 2. VITE_UMAMI_URL

- **Name:** `VITE_UMAMI_URL`
- **Value:** Your Umami analytics URL (e.g., `https://analytics.yourdomain.com`)
- **Important:** Do NOT include trailing slash

## Verification

After adding secrets, trigger a new build:

```bash
# Make a commit
git add .
git commit -m "Update configuration"
git push

# Or manually trigger workflow
# Go to Actions tab → Build and Push Docker Image → Run workflow
```

The Docker image will be built with the analytics script properly configured.

## Local Development

For local development, create a `.env` file in the project root:

```bash
VITE_UMAMI_WEBSITE_ID=your-website-id
VITE_UMAMI_URL=https://analytics.yourdomain.com
```

Then build locally:

```bash
# Build with environment variables
docker build \
  --build-arg VITE_UMAMI_WEBSITE_ID=${VITE_UMAMI_WEBSITE_ID} \
  --build-arg VITE_UMAMI_URL=${VITE_UMAMI_URL} \
  -t lotr-trivia:local .

# Run locally
docker run -p 8080:80 lotr-trivia:local
```
