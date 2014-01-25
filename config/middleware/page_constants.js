var default_config  = require('../config')['default'],
    flash           = require('connect-flash');

exports.handler = function handler (app) {
  app.use(flash());

  app.use(function (req, res, next) {
    res.locals.assetVersion = default_config['asset_version'];
    res.locals.flashInfo   = req.flash('info')[0];
    res.locals.flashError  = req.flash('error')[0];

    res.locals.flash = function (type, msg, options) {
      options = options || {};

      if(options.redirect) {
        req.flash(type, msg);
      } else {
        if(type === 'info') {
          res.locals.flashInfo = msg;
        } else {
          res.locals.flashError = msg;
        }
      }
    };

    res.flash = res.locals.flash;

    next();
  });
};
