# Dockerfile
FROM node:18.20-alpine

# create destination directory
RUN mkdir -p /usr/src/hooli
WORKDIR /usr/src/hooli

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/hooli/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", ".output/server/index.mjs"]