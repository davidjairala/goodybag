var Page = require('../helpers/page_helper').Page,
    signInPage = new Page('Sign in'),
    signUpPage = new Page('Create your account'),
    SignUpInteraction = require('../interactions/user/sign_up_interaction').SignUpInteraction,
    SignInInteraction = require('../interactions/user/sign_in_interaction').SignInInteraction;

exports.controller = function controller (app) {

  app.get('/sign_in', function (req, res) {
    res.render('users/sign_in', {page: signInPage, username: ''});
  });

  app.post('/sign_in', function (req, res) {
    var interaction = new SignInInteraction({username: req.body.username, password: req.body.password});

    interaction.login(function (err, user) {
      if(err) {
        res.flash('error', err);
        res.render('users/sign_in', {page: signInPage, username: interaction.username});
      } else {
        res.flash('info', "Welcome " + interaction.username, {redirect: true});
        res.redirect('/');
      }
    });
  });

  app.get('/sign_up', function (req, res) {
    res.render('users/sign_up', {page: signUpPage, username: '', email: ''});
  });

  app.post('/sign_up', function (req, res) {
    var interaction = new SignUpInteraction({username: req.body.username, email: req.body.email, password: req.body.password, confirmPassword: req.body.confirm_password});

    interaction.save(function (err, user) {
      if(err) {
        res.flash('error', err);
        res.render('users/sign_up', {page: signUpPage, username: interaction.username, email: interaction.email});
      } else {
        res.flash('info', "Welcome " + interaction.username, {redirect: true});
        res.redirect('/');
      }
    });
  });

};
