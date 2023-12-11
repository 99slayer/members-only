const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.user_detail = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id).exec();
	res.render('user_detail', { title: 'user detail', user: user });
});

exports.user_list = asyncHandler(async (req, res, next) => {
	const users = await User.find().exec();
	console.log(users);
	res.render('user_list', { title: 'Users', users: users });
});

exports.user_create_get = asyncHandler(async (req, res, next) => {
	res.render('user_signup', { title: 'signup' });
});

const innerWhitespace = (string) => {
	if (/\s/.test(string)) {
		throw new Error('There must not be any spaces in ' + string);
	}

	return true;
};

exports.user_create_post = [
	body('firstname')
		.trim()
		.custom(innerWhitespace)
		.isLength({ min: 2, max: 30 })
		.withMessage('Must be 2-30 characters long.')
		.escape(),
	body('lastname')
		.trim()
		.custom(innerWhitespace)
		.isLength({ min: 2, max: 30 })
		.withMessage('Must be 2-30 characters long.')
		.escape(),
	body('username')
		.trim()
		.custom(innerWhitespace)
		.isLength({ min: 3, max: 30 })
		.withMessage('Must be 3-30 characters long.')
		.escape(),
	body('password')
		.trim()
		.custom(innerWhitespace)
		.isLength({ min: 8 })
		.withMessage('Must be at least 8 characters long.')
		.escape(),
	body('password-confirm')
		.trim()
		.custom(innerWhitespace)
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords must match.');
			}

			return true;
		})
		.isLength({ min: 8 })
		.withMessage('Must be at least 8 characters long.')
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		bcrypt.hash(req.body.password, 10, async (err, hashedPswd) => {
			const user = new User({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				username: req.body.username,
				password: req.body.password
			});

			if (!errors.isEmpty()) {
				res.render('user_signup', {
					title: 'signup',
					user: user,
					errors: errors.array(),
				});
				return;
			} else {
				user.set({ password: hashedPswd });
				await user.save();

				res.redirect(user.url);
			}
		});
	})
];