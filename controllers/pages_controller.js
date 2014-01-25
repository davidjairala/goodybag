var Page = require('../helpers/page_helper').Page;

exports.controller = function controller (app) {

  app.get('/', function (req, res) {
    var page = new Page('Welcome!');
    res.render('pages/welcome', {page: page});
  });

};