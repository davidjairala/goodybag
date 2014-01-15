var InteractionError = function InteractionError (obj, type, message) {
  this.obj = obj;
  this.errors = {};
  this.errors[obj] = {};
  this.errors[obj]['type'] = type;
  this.errors[obj]['message'] = message;
};

InteractionError.prototype.errorMessage = function errorMessage () {
  return this.errors[this.obj]['message'];
}

exports.InteractionError = InteractionError;