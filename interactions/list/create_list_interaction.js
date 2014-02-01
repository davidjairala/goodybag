var List = require('../../models/list').List;

var CreateListInteraction = function (options) {
  options = options || {};

  this.user = options.user;
  this.name = options.name || '';
  this.description = options.description;
};

CreateListInteraction.prototype.valid = function valid () {
  return !!this.user && this.name.present();
};

CreateListInteraction.prototype.persist = function persist (callback) {
  var list  = new List({userId: this.user.id, name: this.name, description: this.description});

  list.save(function (err, doc) {
    return callback(err, doc);
  });
};

CreateListInteraction.prototype.save = function save (callback) {
  if(!this.valid()) {
    var err = new InteractionError('create_list_interaction', 'invalid', 'Please enter a user and name for your list.');
    return callback(err, null);
  } else {
    this.persist(function (err, doc) {
      return callback(err, doc);
    });
  }
};

exports.CreateListInteraction = CreateListInteraction;
