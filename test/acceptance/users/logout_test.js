var expect = require('expect.js'),
    TestHelper = require('../../test_helper'),
    fixtureBuilder = new TestHelper.FixtureBuilder(),
    acceptanceHelper = TestHelper.acceptanceHelper,
    browser = acceptanceHelper.browser(),
    User = require('../../../models/user').User,
    Session = require('../../../models/session').Session;

describe('Acceptance: Logout', function () {

  it('logs the user out', function (done) {
    browser.visit('/sign_in', function () {

      expect(browser.link('.sign_in_link')).to.be.ok();
      expect(browser.link('.logout_link')).to.not.be.ok();

      fixtureBuilder.createUserTesty(function (err, user) {
        browser.fill('username', 'testy');
        browser.fill('password', 'testing');
        browser.pressButton('Sign In', function () {
          expect(browser.text('ul.info')).to.equal('Welcome testy');
          expect(browser.location.pathname).to.equal('/');

          expect(browser.link('.sign_in_link')).to.not.be.ok();
          expect(browser.link('.logout_link')).to.be.ok();

          browser.visit('/logout', function () {
            expect(browser.text('ul.info')).to.equal('You have logged out successfully');

            expect(browser.location.pathname).to.equal('/');

            expect(browser.link('.sign_in_link')).to.be.ok();
            expect(browser.link('.logout_link')).to.not.be.ok();

            done();
          });
        });

      });
    });
  });

});
