const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res, next) => {
	if (req.isAuthenticated()) {
		res.render('index', { title: 'Home Page', user: req.user });
	} else {
		res.render('index', { title: 'Home Page' });
	}
});

exports.sign_in = [
	body('username')
		.escape(),
	body('password')
		.escape(),

	function (req, res, next) {
		passport.authenticate('local', function (err, user, info) {
			if (err) { return next(err); }

			if (!user) {
				if (info) {
					req.flash('error', info.message);
				}

				req.flash('username', req.body.username);
				return res.redirect('/');
			}

			req.login(user, (err) => {
				if (err) {
					return next(err);
				}

				return res.redirect('/messages');
			});
		})(req, res, next);
	},
];

exports.sign_out = asyncHandler(async (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});