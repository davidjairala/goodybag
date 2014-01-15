exports.handler = function handler (app) {
  // Last middleware always!
  app.use(app.router);
};
