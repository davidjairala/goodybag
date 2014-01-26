var CurrentUserInteraction = require('../../interactions/session/current_user_interaction').CurrentUserInteraction;

exports.handler = function handler (app) {
  app.use(function (req, res, next) {
    var interaction = new CurrentUserInteraction(req);
    interaction.fetch(function (user) {
      res.locals.currentUser = user;
      next();
    });
  });
};
