var Session = require('../../models/session').Session;

var CurrentUserInteraction = function (req) {
  this.req = req;
};

CurrentUserInteraction.prototype.fetch = function fetch (callback) {
  cookie = this.req.signedCookies.goodybag_user_session;

  if(!cookie)
    return callback(null);

  Session.findOne({hash: cookie}, function (err, session) {
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
