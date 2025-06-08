# Step 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve
FROM node:20-alpine AS runner

WORKDIR /app

# Install minimal static server
RUN npm install -g serve

# Copy built frontend from builder
COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:5173"]