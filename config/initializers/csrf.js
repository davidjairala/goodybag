exports.handler = function handler (app) {
  app.use(function (req, res, next) {
    res.locals.token = req.csrfToken();
    next();
  });
};
