FROM node:alpine AS builder

ARG NODE_ENV
ARG BACKEND_URL
ARG DISCORD_REDIRECT_URI
ARG DISCORD_CLIENT_ID
ARG GITHUB_CLIENT_ID

ENV NODE_ENV=$NODE_ENV
ENV BACKEND_URL=$BACKEND_URL
ENV DISCORD_REDIRECT_URI=$DISCORD_REDIRECT_URI
ENV DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID
ENV GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID

WORKDIR /usr/src/client

COPY . .
RUN npm install
RUN npm run-script build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/client/dist /usr/share/nginx/html
