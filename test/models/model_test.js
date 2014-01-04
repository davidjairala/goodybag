var expect      = require('expect.js'),
    TestHelper  = require('../test_helper'),
    User        = require('../../models/user').User;

describe('All models', function () {

  describe('timestamps', function() {

    var user = new User({username: 'fakey', password: 'fakerson'});

    it("sets the updatedAt each time it's saved", function (done) {
      var updatedAt = null;

      user.save(function (err, doc) {
        TestHelper.saveOk(err, doc);

        updatedAt = doc.updatedAt;
        expect(updatedAt).to.be.ok();

        user.save(function (err, doc) {
          TestHelper.saveOk(err, doc);

          expect(doc.updatedAt).to.be.ok();
          expect(doc.updatedAt).to.not.equal(updatedAt);

          done();
        });
      });
    });

    it("only sets the created at when creating", function (done) {
      var createdAt = null;

      user.save(function (err, doc) {
        TestHelper.saveOk(err, doc);

        createdAt = doc.createdAt;
        expect(createdAt).to.be.ok();

        user.save(function (err, doc) {
          TestHelper.saveOk(err, doc);

          expect(doc.createdAt).to.equal(createdAt);

          done();
        });
      });
    });

  });

  describe('clearing the DB', function () {

    it('deletes everything inside the User collection before each test', function (done) {
      var user = new User({username: 'clear', password: 'me'});

      user.save(function (err, doc) {
        TestHelper.saveOk(err, doc);

        User.count({}, function (err, count) {
          expect(count).to.be(1);
          done();
        });
      });
    });

  });

});