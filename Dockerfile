FROM node
RUN npm install -g gatsby-cli
RUN mkdir -p /app
RUN adduser --disabled-password uiuser
RUN chown -R uiuser /app
USER uiuser
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
ADD package.json yarn.lock /app/
RUN npm install
ADD . /app/
EXPOSE 3000