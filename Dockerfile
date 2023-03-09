FROM node:18
WORKDIR /usr/src/Desafio-Backend
COPY package.json .
RUN npm install --omit=dev