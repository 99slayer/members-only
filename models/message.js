const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	timestamp: { type: Date },
	title: { type: String },
	text: { type: String },
	creator: { type: Schema.Types.ObjectId, ref: 'User' },
});

MessageSchema.virtual('url').get(function () {
	return 'placeholder';
});

module.exports = mongoose.model('Message', MessageSchema);