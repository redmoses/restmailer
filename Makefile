ROOT=$(shell pwd)
APP_NAME=mailapp
CONTAINER=ma01
build:
	docker build -t $(APP_NAME) .
start:
	docker rm $(CONTAINER); docker run -dP --name $(CONTAINER) -v $(ROOT):/usr/src/app $(APP_NAME)
stop:
	docker stop $(CONTAINER)
restart: stop start
