var User              = require('../../models/user').User,
    stringService     = require('../../lib/string_service'),
    InteractionError  = require('../interaction_error').InteractionError,
    passwordHelper    = require('./password_interaction_helper');

var SignUpInteraction = function SignUpInteraction (options) {
  options = options || {};

  this.username         = options.username;
  this.password         = options.password;
  this.confirmPassword  = options.confirmPassword;
  this.email            = options.email;
};

SignUpInteraction.prototype.valid = function valid () {
  return  stringService.clean(this.password)        !== '' &&
          stringService.clean(this.confirmPassword) !== '' &&
          stringService.clean(this.username)        !== '';
}

SignUpInteraction.prototype.passwordsMatch = function passwordsMatch () {
  return this.password === this.confirmPassword;
};

SignUpInteraction.prototype.persist = function persist (callback) {
  var user  = new User({username: this.username, email: this.email});

  passwordHelper.hashPassword(this.password, function (err, hash) {
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
  } else if(!this.passwordsMatch()) {
    var err = new InteractionError('sign_up_interaction', 'invalid', "Passwords don't match.");
    return callback(err, null);
  } else {
    this.persist(function (err, doc) {
      return callback(err, doc);
    });
  }
};

exports.SignUpInteraction = SignUpInteraction;
