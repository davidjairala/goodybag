// dependencies
var express         = require('express'),
    fs              = require('fs'),
    http            = require('http'),
    path            = require('path'),
    app             = express(),
    route,
    middelware;

// middlware
fs.readdirSync(path.join(__dirname, 'config', 'initializers')).forEach(function (file) {
  if(file.substr(-3) == '.js') {
    middelware = require('./config/initializers/' + file);
    middelware.handler(app);
  }
});

// development only
app.configure('development', function () {
  app.use(express.errorHandler());
});

// controllers
fs.readdirSync(path.join(__dirname, 'controllers')).forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    route.controller(app);
  }
});

http.createServer(app).listen(app.get('port'), function (){
  console.log('Express server listening on port ' + app.get('port'));
});
