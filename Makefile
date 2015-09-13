APP_NAME = 'mailapp'
CONTAINER = 'ma01'
build:
	docker build -t mailapp .
start:
	docker run -i -t --rm --name $(CONTAINER) -v "$PWD":/usr/src/myapp -w /usr/src/myapp $(APP_NAME)
