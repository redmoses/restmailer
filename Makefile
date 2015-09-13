ROOT=$(shell pwd)
APP_NAME=mailapp
CONTAINER=ma01
build:
	docker build -t $(APP_NAME) .
start:
	docker rm $(CONTAINER); \
	docker run -d -p 3000:3000 --name $(CONTAINER) \
	-v $(ROOT):/usr/src/app $(APP_NAME)
stop:
	docker stop $(CONTAINER)
restart: stop start
logs:
	docker logs $(CONTAINER)
shell:
	docker exec -ti $(CONTAINER) bash
