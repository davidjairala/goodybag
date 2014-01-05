var Page = require('../helpers/page_helper').Page,
    page = new Page('Sign In');

module.exports.controller = function controller (app) {

  app.get('/sign_in', function (req, res) {
    res.render('users/sign_in', {page: page});
  });

};
