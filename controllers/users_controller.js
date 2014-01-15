var Page = require('../helpers/page_helper').Page,
    page = new Page('Sign In'),
    SignUpInteraction = require('../interactions/user/sign_up_interaction').SignUpInteraction,
    SignInInteraction = require('../interactions/user/sign_in_interaction').SignInInteraction;

module.exports.controller = function controller (app) {

  app.get('/sign_in', function (req, res) {
    res.render('users/sign_in', {page: page, username: ''});
  });

  app.post('/sign_in', function (req, res) {
    var interaction = new SignInInteraction({username: req.body.username, password: req.body.password});

    interaction.login(function (err, user) {
      if(err) {
        res.locals.flashError = err.errorMessage();
        res.render('users/sign_in', {page: page, username: interaction.username});
      }
      else {
        res.locals.flashInfo = "Welcome " + interaction.username;
        res.render('users/sign_in', {page: page, username: interaction.username});
      }
    });
  });

  app.get('/sign_up', function (req, res) {
    res.render('users/sign_up', {page: page, username: '', email: ''});
  });

  app.post('/sign_up', function (req, res) {
    var interaction = new SignUpInteraction({username: req.body.username, email: req.body.email, password: req.body.password});

    interaction.save(function (err, user) {
      if(err) {
        res.locals.flashError = err.errorMessage();
        res.render('users/sign_up', {page: page, username: interaction.username, email: interaction.email});
      } else {
        res.locals.flashInfo = "Welcome " + interaction.username;
        res.render('users/sign_in', {page: page, username: interaction.username});
      }
    });
  });

};
