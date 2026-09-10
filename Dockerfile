# Stage 1: Build the site
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the project
RUN bun run build

# Stage 2: Serve the site
FROM caddy:2-alpine AS runner

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /srv

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# Caddy will use the Caddyfile mounted via docker-compose
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
