# Build code with nodejs
FROM node:alpine AS builder

ENV NODE_ENV="production"
ENV BACKEND_URL="http://api.classicrt.bmagic.fr:3000"
ENV DISCORD_REDIRECT_URI="https://classicrt.bmagic.fr/auth-discord"
ENV DISCORD_CLIENT_ID="682243386228473873"
ENV GITHUB_CLIENT_ID="5183c8d1fe3cd5ecce7b"

WORKDIR /usr/src/client

COPY . .
RUN npm install
RUN npm run-script build

# Serve code with nginx
FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/client/dist /usr/share/nginx/html
