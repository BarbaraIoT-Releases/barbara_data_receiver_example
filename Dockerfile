FROM node:alpine

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY src/ ./

CMD ["node","src/server.js"]