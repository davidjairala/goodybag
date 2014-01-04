var DBService         = require('../lib/db_service').DBService,
    dbService         = new DBService(),
    express           = require('express'),
    app               = express(),
    expect            = require('expect.js'),
    model_test_helper = require('./support/model_test_helper');

before(function (done) {
  app.set('env', 'test');
  dbService.connect();
  done();
});

beforeEach(function (done) {
  return dbService.clearDB(done);
});

after(function (done) {
  dbService.disconnect();
  done();
});

exports.saveOk = model_test_helper.saveOk;
