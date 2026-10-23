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

RUN mkdir -p /app/.tmp \
    && if [ ! -s /app/dist/build/index.html ]; then \
      echo "Missing prebuilt Strapi output. Run 'npm run build' in server/ and commit server/dist/ before deploying." >&2; \
      exit 1; \
    fi

EXPOSE 1337

CMD ["npm", "run", "start"]
