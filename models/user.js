var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var userSchema  = new Schema({
  username:   String,
  password:   String,
  email:      String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

var User = mongoose.model('user', userSchema);

exports.User = User;