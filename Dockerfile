FROM ubuntu:trusty
MAINTAINER Red Moses <musa.nasrullah@iappdragon.com>
RUN apt-get update && apt-get install curl; \
  curl -sL https://deb.nodesource.com/setup | sudo bash - && \
  apt-get install nodejs build-essential && \
  mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json /usr/src/app/package.json
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
