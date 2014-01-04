var User          = require('../../models/user').User,
    bcrypt        = require('bcrypt-nodejs'),
    stringService = require('../../lib/string_service'),
    InteractionError = require('../interaction_error').InteractionError;

var SignUpInteraction = function SignUpInteraction (options) {
  options = options || {};

  this.username = options.username;
  this.password = options.password;
  this.email    = options.email;
};

SignUpInteraction.prototype.valid = function valid () {
  return stringService.clean(this.password) !== '' && stringService.clean(this.username) !== '';
}

SignUpInteraction.prototype.hashPassword = function hashPassword (callback) {
  bcrypt.hash(this.password, null, null, function(err, hash) {
    return callback(err, hash);
  });
};

SignUpInteraction.prototype.persist = function persist (callback) {
  var user  = new User({username: this.username, email: this.email});

  this.hashPassword(function (err, hash) {
    user.password = hash;

    user.save(function (err, doc) {
      return callback(err, doc);
    });
  });
};

SignUpInteraction.prototype.save = function save (callback) {
  if(!this.valid()) {
    var err = new InteractionError('sign_up_interaction', 'invalid', 'Please enter username and password.');
    return callback(err, null);
  } else {
    this.persist(function (err, doc) {
      return callback(err, doc);
    });
  }
};

exports.SignUpInteraction = SignUpInteraction;
