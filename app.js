
/**
 * Module dependencies.
 */

var express         = require('express'),
    fs              = require('fs'),
    http            = require('http'),
    path            = require('path'),
    DBService       = require('./lib/db_service').DBService,
    app             = express(),
    connect         = require('connect'),
    Page            = require('./helpers/page_helper').Page,
    page            = new Page('Sign In'),
    _config         = require('./config/config'),
    config          = _config[app.get('env')],
    default_config  = _config['default'];

// ========== //
// Middleware //
// ========== //

app.set('port',         process.env.PORT || default_config['port']);
app.set('views',        path.join(__dirname, 'views'));
app.set('view engine',  'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(default_config['cookie_secret']));
app.use(express.session({secret: default_config['cookie_secret']}));
app.use(express.json());
app.use(express.urlencoded());
app.use(connect.csrf());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Page constants
app.use(function (req, res, next) {
  res.locals.assetVersion = default_config['asset_version'];
  res.locals.flashInfo   = null;
  res.locals.flashError  = null;
  next();
});

// CSRF token
app.use(function (req, res, next) {
  res.locals.token = req.csrfToken();
  next();
});

// Middleware before router
app.use(app.router);

// Connect to DB
dbService = new DBService();
dbService.connect();

// development only
app.configure('development', function () {
  app.use(express.errorHandler());
});

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
