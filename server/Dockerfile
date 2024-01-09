FROM node:18-alpine

WORKDIR /var/www/server

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt 

COPY . .

CMD [ "npm", "run", "dev" ]
