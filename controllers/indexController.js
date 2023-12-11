const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
	if (req.isAuthenticated()) {
		res.render('index', { title: 'Home Page', user: true });
	} else {
		res.render('index', { title: 'Home Page' });
	}
});

exports.sign_in = [
	body('username')
		.escape(),
	body('password')
		.escape(),

	passport.authenticate('local', {
		successRedirect: '/messages',
		failureRedirect: '/',
	})
];

exports.sign_out = asyncHandler(async (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});