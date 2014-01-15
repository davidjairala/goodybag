var DBService = require('../../lib/db_service').DBService

exports.handler = function handler (app) {
  // Connect to DB
  dbService = new DBService();
  dbService.connect();
};
