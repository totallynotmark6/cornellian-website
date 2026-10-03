# Stage 1: Build the site
FROM node:26-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the site
FROM caddy:2-alpine AS runner

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /srv

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# Caddy will use the Caddyfile mounted via docker-compose
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
