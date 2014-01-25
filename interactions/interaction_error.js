var InteractionError = function InteractionError (obj, type, message) {
  this.obj = obj;
  this.message = message;
  this.errors = {};
  this.errors[obj] = message;
};

exports.InteractionError = InteractionError;
