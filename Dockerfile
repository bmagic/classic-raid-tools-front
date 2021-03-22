# Build code with nodejs
FROM node:alpine AS builder

WORKDIR /usr/src/client
RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev python

COPY . .
RUN npm install
RUN npm run-script build

# Serve code with nginx
FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/client/dist /usr/share/nginx/html
