FROM node:22.13.0-alpine as builder

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_PORT=8080

RUN apk add --no-cache libc6-compat bash

RUN apk add --update --no-cache python3 alpine-sdk yarn && ln -sf python3 /usr/bin/python

COPY . .

RUN . .env
RUN yarn && yarn run build

FROM node:22.13.0-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_PORT=8080

COPY --from=builder /app/package.json /app/build .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

ENTRYPOINT ["node", "index.js"]
