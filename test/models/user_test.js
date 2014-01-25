var expect      = require('expect.js'),
    TestHelper  = require('../test_helper'),
    User        = require('../../models/user').User;

describe('User', function () {

  describe('validations', function () {

    var user = new User({username: 'fakey', password: 'fakerson'});

    describe("doesn't permit", function (done) {

      it("saving two users with the same username", function (done) {
        var dup = new User({username: 'fakey', password: 'fakerson'});

        user.save(function (err, doc) {
          TestHelper.saveOk(err, doc);

          dup.save(function (err, doc) {
            expect(err.errors.username.message).to.equal('username already exists!');
            expect(doc).to.not.be.ok();

            User.count({}, function (err, count) {
              expect(count).to.be(1);

              done();
            });
          });
        });
      });

      it("saving a user with no username", function (done) {
        var user = new User({password: 'thing'});

        user.save(function (err, doc) {
          expect(doc).to.not.be.ok();
          expect(err.errors.username.message).to.equal('Path `username` is required.');

          done();
        });
      });

      it("saving a user with no password", function (done) {
        var user = new User({username: 'thing'});

        user.save(function (err, doc) {
          expect(doc).to.not.be.ok();
          expect(err.errors.password.message).to.equal('Path `password` is required.');

          done();
        });
      });

    });

  });

});