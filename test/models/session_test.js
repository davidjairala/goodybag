var expect      = require('expect.js'),
    TestHelper  = require('../test_helper'),
    User        = require('../../models/user').User,
    Session     = require('../../models/session').Session;

describe('Session', function () {

  describe('Associations', function () {

    it('associates with the correct user', function (done) {
      var user    = new User({username: 'pete', password: 'tester'}),
          session = new Session({userId: user.id, hash: 'bla123'});

      user.save(function (err, doc) {
        TestHelper.saveOk(err, doc);

        session.user(function (err, doc) {
          expect(doc).to.be.ok();
          expect(doc._id).to.be.ok();
          expect(doc._id.toString()).to.equal(user._id.toString());
          done();
        });
      });
    });

  })

});
