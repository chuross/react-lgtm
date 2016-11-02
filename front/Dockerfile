FROM node:6.9.1

EXPOSE 8080

# install nginx
RUN curl http://nginx.org/keys/nginx_signing.key | apt-key add - \
      && sh -c "echo 'deb http://nginx.org/packages/ubuntu/ trusty nginx' >> /etc/apt/sources.list"\
      && sh -c "echo 'deb-src http://nginx.org/packages/ubuntu/ trusty nginx' >> /etc/apt/sources.list"
RUN apt-get update && apt-get install -y nginx

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx_docker.conf /etc/nginx/conf.d


# setup app
WORKDIR /workspace

COPY src src/
COPY .babelrc ./
COPY package.json ./
COPY webpack.config.js ./

RUN npm install
RUN npm start

CMD ["nginx", "-g", "daemon off;"]
