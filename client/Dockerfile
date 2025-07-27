# Step 1: Build
FROM node:20 AS builder

# Accept build-time environment variable from docker-compose
ARG VITE_BACKEND_SERVER_URL
ARG VITE_UMAMI_SCRIPT_URL
ARG VITE_UMAMI_WEBSITE_ID
ARG VITE_CONTACT_EMAIL

ENV VITE_BACKEND_SERVER_URL=$VITE_BACKEND_SERVER_URL
ENV VITE_UMAMI_SCRIPT_URL=$VITE_UMAMI_SCRIPT_URL
ENV VITE_UMAMI_WEBSITE_ID=$VITE_UMAMI_WEBSITE_ID
ENV VITE_CONTACT_EMAIL=$VITE_CONTACT_EMAIL

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Step 2: Serve
FROM node:20-alpine AS runner

WORKDIR /app
RUN npm install -g serve

# Copy build artifacts
COPY --from=builder /app/dist ./dist

EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:5173"]