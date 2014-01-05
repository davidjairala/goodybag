var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator'),
    timestamps      = require('mongoose-timestamp'),
    User            = require('./user').User;

var sessionSchema = new Schema({
  userId: {type: Schema.ObjectId, required: true, ref: 'User'},
  hash:   {type: String,          required: true, unique: true}
});
sessionSchema.plugin(uniqueValidator);
sessionSchema.plugin(timestamps);

var Session = mongoose.model('session', sessionSchema);

Session.prototype.user = function user (callback) {
  User.findById(this.userId, function (err, doc) {
    return callback(err, doc);
  });
};

exports.Session = Session;
