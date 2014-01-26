var Session           = require('../../models/session').Session,
    InteractionError  = require('../interaction_error').InteractionError;

var CurrentUserInteraction = function (req) {
  this.req = req;
};

CurrentUserInteraction.prototype.cookie = function cookie () {
  return this.req.signedCookies.goodybag_user_session;
};

CurrentUserInteraction.prototype.findSession = function findSession(callback) {
  var cookie  = this.cookie(),
      error   = new InteractionError('current_user_interaction', 'no_cookie', 'No session cookie found.');

  if(!cookie) {
    return callback(error, null);
  } else {
    Session.findOne({hash: cookie}, function (err, session) {
      return callback(err, session);
    });
  }
};

CurrentUserInteraction.prototype.fetch = function fetch (callback) {
  this.findSession(function (err, session) {
    if(err || !session) {
      return callback(null);
    } else {
      session.user(function (err, user) {
        if(err || !user) {
          return callback(null);
        } else {
          return callback(user);
        }
      });
    }
  });
};

exports.CurrentUserInteraction = CurrentUserInteraction;
