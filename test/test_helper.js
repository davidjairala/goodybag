var MongoHelper       = require('../lib/mongo_helper').MongoHelper,
    mongoHelper       = new MongoHelper(),
    express           = require('express'),
    app               = express(),
    expect            = require('expect.js'),
    model_test_helper = require('./support/model_test_helper');

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

exports.saveOk = model_test_helper.saveOk;
