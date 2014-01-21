var expect            = require('expect.js'),
    TestHelper        = require('../../test_helper'),
    Interaction       = require('../../../interactions/user/sign_in_interaction').SignInInteraction,
    SignUpInteraction = require('../../../interactions/user/sign_up_interaction').SignUpInteraction;

describe('User Sign In Interaction', function () {

  describe('#login', function () {

    beforeEach(function (done) {
      var sign_up_interaction = new SignUpInteraction({username: 'fakey', email: 'fakey@fake.com', password: 'real', confirmPassword: 'real'});

      sign_up_interaction.save(function (err, doc) {
        done();
      });
    });

    it('creates a session for the user', function (done) {
      var interaction = new Interaction({username: 'fakey', password: 'real'});

      interaction.login(function (err, doc) {
        TestHelper.saveOk(err, doc);

        expect(doc.hash).to.be.ok();

        doc.user(function (err, _user) {
          expect(doc.userId.toString()).to.equal(_user.id.toString());
          done();
        });
      });
    });

  });

  describe('#valid', function () {

    describe('returns false when', function () {

      it('no password', function (done) {
        var interaction = new Interaction({username: 'testy'});

        expect(interaction.valid()).to.equal(false);

        done();
      });

      it('no username or email', function (done) {
        var interaction = new Interaction({password: 'testing'});

        expect(interaction.valid()).to.equal(false);
        done();
      });

    });

    describe('returns true when', function () {

      it('username and password', function (done) {
        var interaction = new Interaction({username: 'testy', password: 'testing'});

        expect(interaction.valid()).to.equal(true);
        done();
      });

      it('email and password', function (done) {
        var interaction = new Interaction({email: 'testy@test.com', password: 'testing'});

        expect(interaction.valid()).to.equal(true);
        done();
      });

    });

  });

  describe('#user', function () {

    beforeEach(function (done) {
      var sign_up_interaction = new SignUpInteraction({username: 'fakey', email: 'fakey@fake.com', password: 'real', confirmPassword: 'real'});

      sign_up_interaction.save(function (err, doc) {
        done();
      });
    });

    it('returns the associated user', function (done) {
      var interaction = new Interaction({username: 'fakey', password: 'real'});

      interaction.user(function (err, doc) {
        expect(err).to.not.be.ok();
        expect(doc.username).to.equal('fakey');
        done();
      });
    });

    it("finds the user by email", function (done) {
      var interaction = new Interaction({email: 'fakey@fake.com', password: 'real'});

      interaction.user(function (err, doc) {
        expect(err).to.not.be.ok();
        expect(doc.username).to.equal('fakey');
        done();
      });
    });

    it("doesn't return the user if the password doesn't match", function (done) {
      var interaction = new Interaction({username: 'fakey', password: 'fake'});

      interaction.user(function (err, doc) {
        expect(err).to.be.ok();
        expect(doc).to.not.be.ok();
        expect(err.errors.sign_in_interaction.message).to.equal('Wrong username or password.');
        done();
      });
    });

    describe("doesn't return anything when", function () {

      beforeEach(function (done) {
        var sign_up_interaction = new SignUpInteraction({username: 'fakey', password: 'real'});

        sign_up_interaction.save(function (err, doc) {
          done();
        });
      });

      it("wrong username", function (done) {
        var interaction = new Interaction({username: 'something_else', password: 'real'});

        interaction.user(function (err, doc) {
          expect(err).to.be.ok();
          expect(doc).to.not.be.ok();
          expect(err.errors.sign_in_interaction.message).to.equal('Wrong username or password.');
          done();
        });
      });

      it("no username or email", function (done) {
        var interaction = new Interaction({});

        interaction.user(function (err, doc) {
          expect(err).to.be.ok();
          expect(doc).to.not.be.ok();
          expect(err.errors.sign_in_interaction.message).to.equal('Please enter a username or email and a password.');
          done();
        });
      });

    });

  });

});
