var _config         = require('../config/config'),
    default_config  = _config['default'];

var Page = function (title) {
  this._title = title;
};

Page.prototype.title = function title () {
  return this._title;
};

Page.prototype.siteName = function siteName () {
  return 'goodybag';
};

Page.prototype.fullTitle = function fullTitle () {
  return this._title + ' | ' + this.siteName();
};

Page.prototype.assetVersion = function assetVersion () {
  return default_config['asset_version'];
};

exports.Page = Page;
