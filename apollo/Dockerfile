FROM node:13.10.1-alpine

WORKDIR /app
COPY package.json ./

RUN npm install 

FROM node:13.10.1-alpine
WORKDIR /app

# COPY  /app/node_modules ./node_modules/
COPY ./src ./

CMD ["NODE", "index.js"]
EXPOSE 5500
