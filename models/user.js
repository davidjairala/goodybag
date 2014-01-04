var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator'),
    timestamps      = require('mongoose-timestamp');

var userSchema  = new Schema({
  username:   {type: String, required: true,  unique: true},
  email:      {type: String,                  unique: true},
  password:   {type: String, required: true}
});
userSchema.plugin(uniqueValidator);
userSchema.plugin(timestamps);

var User = mongoose.model('user', userSchema);

exports.User = User;