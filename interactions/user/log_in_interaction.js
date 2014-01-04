var User              = require('../../models/user').User,
    bcrypt            = require('bcrypt-nodejs'),
    InteractionError  = require('../interaction_error').InteractionError,
    passwordHelper    = require('./password_interaction_helper'),
    stringService     = require('../../lib/string_service');

var LogInInteraction = function LogInInteraction (options) {
  options = options || {};

  this.username = options.username;
  this.password = options.password;
  this.email    = options.email;
};

LogInInteraction.prototype.valid = function valid () {
  return (stringService.clean(this.username) !== '' || stringService.clean(this.email) !== '') && 
          stringService.clean(this.password) !== '';
}

LogInInteraction.prototype.searchOptions = function searchOptions () {
  var options = {};

  if(stringService.clean(this.username) !== '')
    options = {username: this.username};
  else if(stringService.clean(this.email) !== '')
    options = {email: this.email};

  return options;
}

LogInInteraction.prototype._findUser = function _findUser (callback) {
  var genericError  = new InteractionError('log_in_interaction', 'invalid', 'Wrong username or password.');

  User.findOne(this.searchOptions(), function (err, doc) {
    if(err || !doc) {
      return callback(genericError, null);
    } else {
      bcrypt.compare(this.password, doc.password, function(err, res) {
        if(err || res !== true) {
          return callback(genericError, null);
        } else {
          return callback(err, doc);
        }
      });
    }
  }.bind(this));
};

LogInInteraction.prototype.user = function user (callback) {
  var emptyError;

  if(!this.valid()) {
    emptyError = new InteractionError('log_in_interaction', 'invalid', 'Please enter a username or email and a password.');
    return callback(emptyError, null)
  } else {
    this._findUser(function (err, doc) {
      return callback(err, doc);
    });
  }
};

LogInInteraction.prototype.login = function login () {

};

exports.LogInInteraction = LogInInteraction;
