BIN = ./node_modules/.bin

test:
	NODE_ENV=test $(BIN)/mocha test/**/* --reporter list

start_db:
	scripts/start_db.sh &

start: start_db
	node app.js

stop_db:
	pkill mongod

stop: stop_db

install link:
	@npm $@

.PHONY: test test-w