const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.message_list = asyncHandler(async (req, res, next) => {
	const messages = await Message.find({}).populate('creator').exec();
	res.render('message_form', {
		title: 'POSTS',
		messages: messages,
		user: req.user
	});
});

exports.messages_post_pass = [
	body('secret-password')
		.escape()
		.custom(value => {
			if (value === process.env.CLUB_PASSWORD) {
				return true;
			} else {
				return false;
			}
		})
		.withMessage('Incorrect password.'),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const user = req.user;

		if (!errors.isEmpty()) {
			const messages = await Message.find({}).populate('creator').exec();
			res.render('message_form', {
				title: 'messages',
				messages: messages,
				user: req.user,
				errors: errors.array()
			});
		} else {
			user.set({ membership_status: true });
			await User.findByIdAndUpdate(user._id, user, {});
			res.redirect('/messages');
		}
	})
];

exports.messages_post_message = [
	body('text')
		.trim()
		.isLength({ min: 1, max: 2000 })
		.withMessage('Cannot submit empty message.')
		.escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		console.log(errors.array());

		const message = new Message({
			timestamp: new Date(),
			text: req.body.text,
			creator: req.user._id
		});

		if (!errors.isEmpty()) {
			const messages = await Message.find({}).populate('creator').exec();
			res.render('message_form', {
				title: 'POSTS',
				messages: messages,
				user: req.user,
				text: req.body.text,
				errors: errors.array()
			});
		} else {
			await message.save();
			res.redirect('/messages');
		}
	})
];
