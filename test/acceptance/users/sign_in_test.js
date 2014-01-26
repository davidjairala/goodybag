var expect = require('expect.js'),
    TestHelper = require('../../test_helper'),
    fixtureBuilder = new TestHelper.FixtureBuilder(),
    acceptanceHelper = TestHelper.acceptanceHelper,
    browser = acceptanceHelper.browser(),
    User = require('../../../models/user').User,
    Session = require('../../../models/session').Session;

describe('Acceptance: Sign In', function () {

  beforeEach(function (done) {
    browser.visit('/sign_in', done);
  });

  it('renders the sign in form', function (done) {
    expect(browser.success).to.be.ok();
    expect(browser.text('h2')).to.equal('Sign in');
    expect(browser.text('label[for="username"]')).to.equal('Username');
    expect(browser.text('label[for="password"]')).to.equal('Password');
    done();
  });

  it('signs user in', function (done) {
    fixtureBuilder.createUserTesty(function (err, user) {
      browser.fill('username', 'testy');
      browser.fill('password', 'testing');
      browser.pressButton('Sign In', function () {
        expect(browser.text('ul.info')).to.equal('Welcome testy');
        expect(browser.location.pathname).to.equal('/');

        done();
      });

    });
  });

  it('saves the session', function (done) {
    expect(browser.link('.sign_in_link')).to.be.ok();
    expect(browser.link('.logout_link')).to.not.be.ok();

    fixtureBuilder.createUserTesty(function (err, user) {
      browser.fill('username', 'testy');
      browser.fill('password', 'testing');
      browser.pressButton('Sign In', function () {
        User.findOne({username: 'testy'}, function (err, user) {
          TestHelper.saveOk(err, user);

          Session.findOne({userId: user.id}, function (err, session) {
            TestHelper.saveOk(err, session);

            expect(browser.link('.sign_in_link')).to.not.be.ok();
            expect(browser.link('.logout_link')).to.be.ok();

            done();
          });
        });
      });

    });
  });

  describe('it shows error for', function () {

    it('no user found', function (done) {
      browser.fill('username', 'nothing');
      browser.fill('password', 'nada');
      browser.pressButton('Sign In', function () {
        expect(browser.text('ul.errors')).to.equal('Wrong username or password.');
        expect(browser.location.pathname).to.equal('/sign_in');

        done();
      });
    });

    it('wrong password', function (done) {
      fixtureBuilder.createUserTesty(function (err, user) {
        browser.fill('username', 'testy');
        browser.fill('password', 'wrongone');
        browser.pressButton('Sign In', function () {
          expect(browser.text('ul.errors')).to.equal('Wrong username or password.');
          expect(browser.location.pathname).to.equal('/sign_in');

          done();
        });

      });
    });

  });

});
