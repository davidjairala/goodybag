var SignUpInteraction = require('../../interactions/user/sign_up_interaction').SignUpInteraction,
    errorMessage = 'error creating fixture! :: ';

var FixtureBuilder = function () {};

FixtureBuilder.prototype.createUserTesty = function createUserTesty (callback) {
  var interaction = new SignUpInteraction({username: 'testy', password: 'testing', confirmPassword: 'testing'});
  interaction.save(function (err, doc) {
    callback(err, doc);
  });
};

exports.FixtureBuilder = FixtureBuilder;
