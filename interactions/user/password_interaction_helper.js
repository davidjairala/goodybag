var bcrypt = require('bcrypt-nodejs')

exports.hashPassword = function hashPassword (password, callback) {
  bcrypt.hash(password, null, null, function(err, hash) {
    return callback(err, hash);
  });
};
