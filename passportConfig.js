const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user');

function initialize(passport) {
	const authenticateUser = async (username, password, done) => {
		const user = await User.findOne({ username: username }).exec();

		if (user === null) {
			return done(null, false, { message: 'User does not exist.' });
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Incorrect password.' });
			}
		} catch (error) {
			return done(error);
		}
	};

	passport.use(
		new LocalStrategy(authenticateUser)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		return done(null, await User.findById(id).exec());
	});
}

module.exports = initialize;