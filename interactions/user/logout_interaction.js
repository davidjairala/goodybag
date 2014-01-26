var Session = require('../../models/session').Session,
    CurrentUserInteraction = require('../session/current_user_interaction').CurrentUserInteraction;

var LogoutInteraction = function (req, res) {
  this.res = res;
  this.req = req;
};

LogoutInteraction.prototype.logout = function logout (callback) {
  var currentUserIntearction  = new CurrentUserInteraction(this.req);

  currentUserIntearction.findSession(function (err, session) {
    session.remove();
    this.res.clearCookie('goodybag_user_session');
    return callback(err);
  }.bind(this));
};

exports.LogoutInteraction = LogoutInteraction;