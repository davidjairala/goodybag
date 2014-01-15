var _config         = require('../config/config');

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

exports.Page = Page;
