# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock* package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci --ignore-scripts || npm install --ignore-scripts

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production runtime with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
