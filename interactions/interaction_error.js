var InteractionError = function InteractionError (obj, type, message) {
  this.errors = {};
  this.errors[obj] = {};
  this.errors[obj]['type'] = type;
  this.errors[obj]['message'] = message;
};

exports.InteractionError = InteractionError;