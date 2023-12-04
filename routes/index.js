var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

// INDEX
router.get('/', indexController.index);

// USER
router.get('/user/detail', userController.user_detail);
router.get('/users', userController.user_list);

router.get('/user/create', userController.user_create_get);
router.post('/user/create', userController.user_create_post);

// MESSAGE
router.get('/messages', messageController.message_list);

router.get('/message/create', messageController.message_create_get);
router.post('/message/create', messageController.message_create_post);

module.exports = router;
