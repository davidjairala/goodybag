var mongoose  = require('mongoose'),
    express   = require('express'),
    app       = express();

var DBService = function () {
  this.server = '127.0.0.1';
  this.db     = 'goodybag_' + app.get('env');
};

DBService.prototype.connect = function connect () {
  mongoose.connect('mongodb://' + this.server + '/' + this.db);
  console.log('connected to mongodb: ' + this.server + ' @ ' + this.db);
};

DBService.prototype.disconnect = function disconnect () {
  mongoose.disconnect();
  console.log('disconnected from mongodb: ' + this.server + ' @ ' + this.db);
};

DBService.prototype.clearDB = function clearDB (callback) {
  for(var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {});
  }

  return callback();
};

exports.DBService = DBService;
