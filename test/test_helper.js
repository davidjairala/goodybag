var DBService         = require('../lib/db_service').DBService,
    dbService         = new DBService(),
    express           = require('express'),
    app               = express(),
    goodybag          = require('../app'),
    expect            = require('expect.js'),
    modelTestHelper   = require('./support/model_test_helper'),
    acceptanceHelper  = require('./support/acceptance_helper'),
    fixtureHelper     = require('./support/fixture_helper');

before(function (done) {
  app.set('env', 'test');
  done();
});

beforeEach(function (done) {
  return dbService.clearDB(done);
});

after(function (done) {
  dbService.disconnect();
  done();
});

exports.saveOk = modelTestHelper.saveOk;
exports.AcceptanceHelper = acceptanceHelper.AcceptanceHelper;
exports.acceptanceHelper = new acceptanceHelper.AcceptanceHelper();
exports.FixtureBuilder = fixtureHelper.FixtureBuilder;
