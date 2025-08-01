# 1. Builder: frontend + server
FROM node:20 AS builder

ARG VITE_BACKEND_SERVER_URL
ARG VITE_UMAMI_SCRIPT_URL
ARG VITE_UMAMI_WEBSITE_ID
ARG VITE_CONTACT_EMAIL

ENV VITE_BACKEND_SERVER_URL=$VITE_BACKEND_SERVER_URL
ENV VITE_UMAMI_SCRIPT_URL=$VITE_UMAMI_SCRIPT_URL
ENV VITE_UMAMI_WEBSITE_ID=$VITE_UMAMI_WEBSITE_ID
ENV VITE_CONTACT_EMAIL=$VITE_CONTACT_EMAIL

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN npm run build:server


# 2. Runner: lean production
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server ./dist-server
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN npm ci --omit=dev

EXPOSE 80
CMD ["node", "dist-server/server.cjs"]