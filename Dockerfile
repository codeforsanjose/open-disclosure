FROM node:alpine as builder

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++ \
#     git \
#     openssh-client

RUN npm install
RUN npm install -g gatsby-cli

RUN npm run-script build

FROM openresty/openresty
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY --from=builder /usr/src/app/open-disclosure/public /usr/local/openresty/nginx/html
EXPOSE 80