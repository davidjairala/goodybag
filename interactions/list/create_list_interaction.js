var List = require('../../models/list').List;

var CreateListInteraction = function (options) {
  options = options || {};

  this.user = options.user;
  this.name = options.name;
  this.description = options.description;
};

CreateListInteraction.prototype.save = function save () {

};

exports.CreateListInteraction = CreateListInteraction;