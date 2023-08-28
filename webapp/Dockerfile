FROM node:14.20-alpine as node
WORKDIR /app

COPY . /app
RUN apk update && apk upgrade && rm -vrf /var/cache/apk/*
RUN npm install -g @angular/cli@14
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=node /app/dist/turmalina /usr/share/nginx/html
COPY  --from=node /app/default.conf /etc/nginx/conf.d/