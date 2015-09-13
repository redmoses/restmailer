FROM ubuntu:trusty
MAINTAINER Red Moses <musa.nasrullah@iappdragon.com>
RUN apt-get update; \
  apt-get install -y python-software-properties software-properties-common build-essential; \
  add-apt-repository -y ppa:chris-lea/node.js; \
  apt-get update; apt-get install -y nodejs; \
  mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
CMD npm install; npm start
