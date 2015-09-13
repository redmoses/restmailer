ROOT=$(shell pwd)
APP_NAME=mailapp
CONTAINER=ma01
MAIL_HOST=smtp.example.com
MAIL_PORT=25
MAIL_FROM=dummy@example.com
MAIL_USER=dummy
MAIL_PASS=dummy
build:
	docker build -t $(APP_NAME) .
start:
	docker rm $(CONTAINER); \
	docker run -d -p 3000:3000 --name $(CONTAINER) \
	-e "MAIL_HOST=$(MAIL_HOST)" \
	-e "MAIL_PORT=$(MAIL_PORT)" \
	-e "MAIL_FROM=$(MAIL_FROM)"	\
	-e "MAIL_USER=$(MAIL_USER)" \
	-e "MAIL_PASS=$(MAIL_PASS)" \
	-v $(ROOT):/usr/src/app $(APP_NAME)
stop:
	docker stop $(CONTAINER)
restart: stop start
logs:
	docker logs $(CONTAINER)
shell:
	docker exec -ti $(CONTAINER) bash
