const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname: { type: String },
	lastname: { type: String },
	username: { type: String },
	password: { type: String },
	membershipStatus: { type: Boolean },
});

UserSchema.virtual('fullname').get(function () {
	return this.firstname + ' ' + this.lastname;
});

UserSchema.virtual('url').get(function () {
	return 'placeholder';
});

module.exports = mongoose.model('User', UserSchema);