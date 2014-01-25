var expect = require('expect.js'),
    TestHelper = require('../../test_helper'),
    fixtureBuilder = new TestHelper.FixtureBuilder(),
    acceptanceHelper = TestHelper.acceptanceHelper,
    browser = acceptanceHelper.browser(),
    User = require('../../../models/user').User;

describe('Acceptance: Sign Up', function () {

  beforeEach(function (done) {
    browser.visit('/sign_up', done);
  });

  it('renders the sign up form', function (done) {
    expect(browser.success).to.be.ok();
    expect(browser.text('h2')).to.equal('Create your account');
    expect(browser.text('label[for="username"]')).to.equal('Username');
    expect(browser.text('label[for="email"]')).to.equal('Email');
    expect(browser.text('label[for="password"]')).to.equal('Password');
    expect(browser.text('label[for="confirm_password"]')).to.equal('Confirm password');
    done();
  });

  describe('signs user up with', function () {

    it('just username' , function (done) {
      browser.fill('username', 'testy');
      browser.fill('password', 'testing');
      browser.fill('confirm_password', 'testing');
      browser.pressButton('Create your account', function () {
        expect(browser.text('ul.info')).to.equal('Welcome testy');
        expect(browser.location.pathname).to.equal('/');

        User.findOne({username: 'testy'}, function (err, user) {
          TestHelper.saveOk(err, user);
          done();
        });
      });
    });

    it('username and email', function (done) {
      browser.fill('username', 'testy');
      browser.fill('email', 'testy@test.com');
      browser.fill('password', 'testing');
      browser.fill('confirm_password', 'testing');
      browser.pressButton('Create your account', function () {
        expect(browser.location.pathname).to.equal('/');
        expect(browser.text('ul.info')).to.equal('Welcome testy');

        User.findOne({username: 'testy', email: 'testy@test.com'}, function (err, user) {
          TestHelper.saveOk(err, user);

          done();
        });
      });
    });

  });

  describe('shows error when', function () {

    it('no username', function (done) {
      browser.fill('password', 'testing');
      browser.fill('confirm_password', 'testing');
      browser.pressButton('Create your account', function () {
        expect(browser.text('ul.errors')).to.equal('Please enter username and password.');
        expect(browser.location.pathname).to.equal('/sign_up');
        done();
      });
    });

    it('no password', function (done) {
      browser.fill('username', 'testy');
      browser.pressButton('Create your account', function () {
        expect(browser.text('ul.errors')).to.equal('Please enter username and password.');
        expect(browser.location.pathname).to.equal('/sign_up');
        done();
      });
    });

    it("passwords don't match", function (done) {
      browser.fill('username', 'testy');
      browser.fill('password', 'testing1');
      browser.fill('confirm_password', 'testing2');
      browser.pressButton('Create your account', function () {
        expect(browser.text('ul.errors')).to.equal("Passwords don't match.");
        expect(browser.location.pathname).to.equal('/sign_up');
        done();
      });
    });

  });

});
