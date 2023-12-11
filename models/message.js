const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const MessageSchema = new Schema({
	timestamp: { type: Date, required: true },
	text: { type: String, required: true },
	creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

MessageSchema.virtual('creation_date_formatted').get(function () {
	const dt = DateTime.fromJSDate(this.timestamp);
	return dt.toLocaleString(DateTime.DATE_SHORT) + ' ' + dt.toLocaleString(DateTime.TIME_WITH_SECONDS);
});

MessageSchema.virtual('url').get(function () {
	return `/message/${this._id}`;
});

module.exports = mongoose.model('Message', MessageSchema);