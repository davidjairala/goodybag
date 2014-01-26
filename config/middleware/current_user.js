var CurrentUserInteraction = require('../../interactions/session/current_user_interaction').CurrentUserInteraction,
    interaction;

exports.handler = function handler (app) {
  app.use(function (req, res, next) {
    interaction = new CurrentUserInteraction(req);
    interaction.fetch(function (user) {
      res.locals.currentUser = user;
      next();
    });
  });
};
