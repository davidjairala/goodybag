var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    uniqueValidator = require('mongoose-unique-validator'),
    timestamps      = require('mongoose-timestamp'),
    messages        = require('./common').messages;

var listSchema = new Schema({
  userId: {type: Schema.ObjectId, index: true, required: true, ref: 'User'},
  name:   {type: String, required: true},
  description: {type: String}
});
listSchema.plugin(uniqueValidator, {message: messages.errors.unique});
listSchema.plugin(timestamps);

var List = mongoose.model('list', listSchema);

exports.List = List;
