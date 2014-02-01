var expect = require('expect.js'),
    TestHelper = require('../../test_helper'),
    fixtureBuilder = new TestHelper.FixtureBuilder(),
    CreateListInteraction = require('../../../interactions/list/create_list_interaction').CreateListInteraction;

describe('Create List Interaction', function () {

  describe('#valid', function () {

    it('returns true when user and name are present', function (done) {
      fixtureBuilder.createUserTesty(function (err, user) {
        var interaction = new CreateListInteraction({user: user, name: 'Test List'});
        expect(interaction.valid()).to.equal(true);
        done();
      });
    });

    it('returns false when no user', function () {
      var interaction = new CreateListInteraction({name: 'Test List'});
      expect(interaction.valid()).to.equal(false);
    });

    it('returns false when no name', function (done) {
      fixtureBuilder.createUserTesty(function (err, user) {
        var interaction = new CreateListInteraction({user: user});
        expect(interaction.valid()).to.equal(false);
        done();
      });
    });

  });

  describe('#save', function () {

    it('creates a new list for the user', function (done) {
      fixtureBuilder.createUserTesty(function (err, user) {
        var interaction = new CreateListInteraction({user: user, name: 'Test List'});
        interaction.save(function (err, list) {
          TestHelper.saveOk(err, list);
          done();
        });
      });
    });

  });

});
