const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	membership_status: { type: Boolean, default: false },
});

UserSchema.virtual('fullname').get(function () {
	return this.firstname + ' ' + this.lastname;
});

UserSchema.virtual('url').get(function () {
	return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);