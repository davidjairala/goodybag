
/**
 * Module dependencies.
 */

var express         = require('express'),
    fs              = require('fs'),
    http            = require('http'),
    path            = require('path'),
    DBService       = require('./lib/db_service').DBService,
    app             = express(),
    _config         = require('./config/config'),
    config          = _config[app.get('env')],
    default_config  = _config['default'];

// all environments
app.set('port',         process.env.PORT || default_config['port']);
app.set('views',        path.join(__dirname, 'views'));
app.set('view engine',  'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(default_config['cookie_secret']));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to DB
dbService = new DBService();
dbService.connect();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// controllers
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

http.createServer(app).listen(app.get('port'), function (){
  console.log('Express server listening on port ' + app.get('port'));
});
