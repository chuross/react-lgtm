FROM node:6.9.1

EXPOSE 8080

ENV PORT 8080

# setup app
WORKDIR /workspace

COPY config config/
COPY src src/
COPY .babelrc ./
COPY package.json ./
COPY webpack.config.js ./
COPY index.js ./

RUN npm install

CMD ["npm", "start"]
