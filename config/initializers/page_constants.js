var default_config = require('../config')['default'];

exports.handler = function handler (app) {
  app.use(function (req, res, next) {
    res.locals.assetVersion = default_config['asset_version'];
    res.locals.flashInfo   = null;
    res.locals.flashError  = null;
    next();
  });
};
