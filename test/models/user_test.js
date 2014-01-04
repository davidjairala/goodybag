var expect      = require('expect.js'),
    TestHelper  = require('../test_helper'),
    User        = require('../../models/user').User;

describe('User', function () {

  describe('.clear', function () {

    it('deletes everything inside the User collection before each test', function (done) {
      var user = new User({username: 'fakey', password: 'fakerson'});
      expect(user._id).to.be.ok();

      user.save(function (err, docs) {
        if(err) {
          console.log('error: ' + err);
        }

        User.count({}, function (err, count) {
          expect(count).to.be(1);
          done();
        });
      });
    });

  });

});