var MongoHelper = require('../lib/mongo_helper').MongoHelper,
    mongoHelper = new MongoHelper(),
    express     = require('express'),
    app         = express();

before(function (done) {
  app.set('env', 'test');
  mongoHelper.connect();
  done();
});

beforeEach(function (done) {
  return mongoHelper.clearDB(done);
});

after(function (done) {
  mongoHelper.disconnect();
  done();
});