FROM node:12 as builder

WORKDIR /srv

COPY package.json yarn.lock ./
RUN npm install --legacy-peer-deps
RUN npm config set unsafe-perm true
RUN npm install -g gatsby-cli
COPY . .
RUN npm run-script build

FROM nginx:1.21.3
COPY --from=builder /srv/public /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]