var User              = require('../../models/user').User,
    bcrypt            = require('bcrypt-nodejs'),
    crypto            = require('crypto'),
    InteractionError  = require('../interaction_error').InteractionError,
    passwordHelper    = require('./password_interaction_helper'),
    stringService     = require('../../lib/string_service'),
    Session           = require('../../models/session').Session;

var SignInInteraction = function SignInInteraction (options) {
  options = options || {};

  this.username = options.username;
  this.password = options.password;
  this.email    = options.email;
};

SignInInteraction.prototype.valid = function valid () {
  return (stringService.clean(this.username) !== '' || stringService.clean(this.email) !== '') && 
          stringService.clean(this.password) !== '';
}

SignInInteraction.prototype.searchOptions = function searchOptions () {
  var options = {};

  if(stringService.clean(this.username) !== '')
    options = {username: this.username};
  else if(stringService.clean(this.email) !== '')
    options = {email: this.email};

  return options;
}

SignInInteraction.prototype._findUser = function _findUser (callback) {
  var genericError  = new InteractionError('sign_in_interaction', 'invalid', 'Wrong username or password.');

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

SignInInteraction.prototype.user = function user (callback) {
  var emptyError;

  if(!this.valid()) {
    emptyError = new InteractionError('sign_in_interaction', 'invalid', 'Please enter a username or email and a password.');
    return callback(emptyError, null)
  } else {
    this._findUser(function (err, doc) {
      return callback(err, doc);
    });
  }
};

SignInInteraction.prototype.hash = function hash () {
  return crypto.randomBytes(20).toString('hex');
};

SignInInteraction.prototype.createSession = function createSession (user, callback) {
  var session = new Session({userId: user.id, hash: this.hash()});

  session.save(function (err, doc) {
    return callback(err, doc);
  });
};

SignInInteraction.prototype.login = function login (callback) {
  this.user(function (err, doc) {
    if(err) {
      return callback(err, null);
    } else {
      this.createSession(doc, function (err, doc) {
        return callback(err, doc);
      });
    }
  }.bind(this));
};

exports.SignInInteraction = SignInInteraction;
