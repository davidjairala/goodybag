var express         = require('express'),
    default_config  = require('../config')['default'],
    path            = require('path'),
    connect         = require('connect');

exports.handler = function handler (app) {
  app.set('port',         process.env.PORT || default_config['port']);
  app.set('views',        path.join(__dirname, '..', '..', 'views'));
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
  app.use(require('stylus').middleware(path.join(__dirname, '..', '..', 'public')));
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));
};