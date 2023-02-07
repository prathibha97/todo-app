FROM node:apline

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]