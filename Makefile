BIN = ./node_modules/.bin

build:
	cp config/config.example.json config/config.json
	cp config/mongo_config.example.txt config/mongo_config.txt
	cp scripts/start_db.example.sh scripts/start_db.sh
	chmod +x scripts/start_db.sh

install link:
	@npm $@

test:
	NODE_ENV=test $(BIN)/mocha test/**/* --reporter list

start_db:
	scripts/start_db.sh &

start: start_db
	node app.js

stop_db:
	pkill mongod

stop: stop_db

.PHONY: test test-w
