var expect      = require('expect.js'),
    TestHelper  = require('../../test_helper'),
    Interaction = require('../../../interactions/user/sign_up_interaction').SignUpInteraction;

describe('User Sign Up Interaction', function () {

  describe('#valid', function () {

    describe('returns false when', function () {

      it('no password', function (done) {
        var interaction = new Interaction({username: 'testy', email: 'testy@test.com', confirmPassword: 'testing'});

        expect(interaction.valid()).to.equal(false);

        done();
      });

      it('no password confirmation', function (done) {
        var interaction = new Interaction({username: 'testy', email: 'testy@test.com', password: 'testing'});

        expect(interaction.valid()).to.equal(false);

        done();
      });

      it('no username', function (done) {
        var interaction = new Interaction({email: 'testy@test.com', password: 'testing', confirmPassword: 'testing'});

        expect(interaction.valid()).to.equal(false);
        done();
      });

    });

    it('returns true when username and password', function (done) {
      var interaction = new Interaction({username: 'testy', password: 'testing', confirmPassword: 'testing'});

      expect(interaction.valid()).to.equal(true);
      done();
    });

  });

  describe('#save', function () {

    var interaction = new Interaction({username: 'testy', email: 'testy@test.com', password: 'testing', confirmPassword: 'testing'});

    it('persists the user', function (done) {
      interaction.save(function (err, doc) {
        TestHelper.saveOk(err, doc);
        done();
      });
    });

    it('hashes the password', function (done) {
      interaction.save(function (err, doc) {
        var currentPassword = doc.password;

        expect(currentPassword).to.be.ok();
        expect(currentPassword).to.not.equal('testing');

        done();
      });
    });

    it('returns an interaction error when not valid', function (done) {
      var interaction = new Interaction({});
      expect(interaction.valid()).to.equal(false);

      interaction.save(function (err, doc) {
        expect(doc).to.not.be.ok();
        expect(err.errors.sign_up_interaction.type).to.equal('invalid');
        expect(err.errors.sign_up_interaction.message).to.equal('Please enter username and password.');
        done();
      });
    });

    it('returns an interaction error when passwords do not match', function (done) {
      var interaction = new Interaction({username: 'testy', password: 'testing', confirmPassword: 'testing2'});
      expect(interaction.valid()).to.equal(true);
      expect(interaction.passwordsMatch()).to.equal(false);

      interaction.save(function (err, doc) {
        expect(doc).to.not.be.ok();
        expect(err.errors.sign_up_interaction.type).to.equal('invalid');
        expect(err.errors.sign_up_interaction.message).to.equal("Passwords don't match.");
        done();
      });
    });

  });

});
