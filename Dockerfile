FROM node:alpine

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY src/ ./
COPY certs/ ./certs/

CMD ["node","server.js"]