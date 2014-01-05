# README

## Setup

* [install node.js](http://nodejs.org/download/)
* [install MongoDB](http://docs.mongodb.org/manual/installation/)

```bash
git clone git@github.com:davidjairala/goodybag.git
cd goodybag
make build
make install
```

Then modify `config/config.json`, `config/mongo_config.txt` and `scripts/start_db.sh` as necessary to make sense for your setup.

## Start the server

```bash
make start
```

## Run the tests

```bash
make test
```