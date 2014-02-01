// dependencies
var express         = require('express'),
    fs              = require('fs'),
    http            = require('http'),
    path            = require('path'),
    app             = express(),
    config          = require('./config/config'),
    port, middelware, initializer, route;

port = process.env.PORT ? process.env.PORT : config[app.get('env')]['port']

// middleware
fs.readdirSync(path.join(__dirname, 'config', 'middleware')).forEach(function (file) {
  if(file.substr(-3) == '.js') {
    middelware = require('./config/middleware/' + file);
    middelware.handler(app);
  }
});

// initializers
fs.readdirSync(path.join(__dirname, 'config', 'initializers')).forEach(function (file) {
  if(file.substr(-3) == '.js') {
    initializer = require('./config/initializers/' + file);

    if(typeof initializer.handler === 'function')
      initializer.handler(app);
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

app.set('port', port);

http.createServer(app).listen(app.get('port'), function (){
  console.log('Express server listening on port ' + app.get('port'));
});
