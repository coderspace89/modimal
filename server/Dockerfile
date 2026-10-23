FROM node:22-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .

ENV NODE_ENV=production
ENV HOST=0.0.0.0

RUN mkdir -p /app/.tmp && npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
