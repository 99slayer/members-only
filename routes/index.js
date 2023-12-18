var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

// INDEX
router.get('/', indexController.index);
router.post('/', indexController.sign_in);
router.get('/signout', indexController.sign_out);

// USER
router.get('/user/create', userController.user_create_get);
router.post('/user/create', userController.user_create_post);

router.get('/user/:id', userController.user_detail);
router.get('/users', userController.user_list);

// MESSAGE
router.get('/messages', messageController.message_list);

router.post('/messages/password', messageController.messages_post_pass);
router.post('/messages/message', messageController.messages_post_message);
router.post('/messages/delete', messageController.messages_delete_message);

module.exports = router;
