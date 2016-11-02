FROM node:6.9.1

WORKDIR /workspace

EXPOSE 3000

# setup app
WORKDIR /workspace

COPY config ./config
COPY index.js ./
COPY package.json ./

RUN npm install

CMD ["node", "index.js"]
