var express = require('express'),
    app = express(),
    goodybag = require('../../app'),
    http = require('http'),
    Browser = require('zombie');

var AcceptanceHelper = function () {
  this._browser = null;
};

AcceptanceHelper.prototype.browser = function browser () {
  if(this._browser) return this._browser;

  this._browser = new Browser({ site: 'http://127.0.0.1:6001' });
  return this._browser;
}

exports.AcceptanceHelper = AcceptanceHelper;
