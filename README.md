# README

## Setup

* [install node.js](http://nodejs.org/download/)
* [install MongoDB](http://docs.mongodb.org/manual/installation/)

```bash
git clone git@github.com:davidjairala/goodybag.git
cd goodybag
cp config/config.example.json config/config.json
cp config/mongo_config.example.txt config/mongo_config.txt
cp scripts/start_db.example.sh scripts/start_db.sh
chmod +x scripts/start_db.sh
npm install
```

Then modify `config/config.json`, `config/mongo_config.txt` and `scripts/start_db.sh` as necessary to make sense for your setup.

## Start the server

```bash
npm start
```

## Run the tests

```bash
npm test
```