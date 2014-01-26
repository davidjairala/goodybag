var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator'),
    timestamps      = require('mongoose-timestamp'),
    messages        = require('./common').messages;

var userSchema  = new Schema({
  username:   {type: String, index: true, required: true,  unique: true},
  email:      {type: String, index: true},
  password:   {type: String, required: true}
});
userSchema.plugin(uniqueValidator, {message: messages.errors.unique});
userSchema.plugin(timestamps);

var User = mongoose.model('user', userSchema);

exports.User = User;
