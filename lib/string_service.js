exports.clean = function clean (str) {
  str = str || '';
  return str.toString().replace(/ +/gi, ' ').trim();
};