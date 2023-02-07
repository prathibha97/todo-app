FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]
