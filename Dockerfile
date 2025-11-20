FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# If you have a build step (e.g., TypeScript/bundler), uncomment:
# RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]