String.prototype.clean = function clean () {
  return this.replace(/ +/gi, ' ').trim();
};

String.prototype.empty = function empty () {
  return this.clean() === '';
};

String.prototype.present = function present () {
  return !this.empty();
};