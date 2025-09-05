FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY drizzle ./drizzle
COPY drizzle.config.ts ./
COPY package*.json .
RUN npm install --omit=dev
ENV NODE_ENV=production
CMD ["npm", "start"]
