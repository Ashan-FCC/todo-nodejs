FROM node:8.4.0

COPY package.json /usr/src/app/package.json

WORKDIR /usr/src/app
RUN npm install --loglevel error

COPY . /usr/src/app

RUN chmod +x ./docker-wait.sh

CMD ["node", "./bin/todo.js"]
