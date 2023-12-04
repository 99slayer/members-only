var express = require('express');
var router = express.Router();

const messageController = require('../controllers/messageController');

router.get('/messages', messageController.message_list);

router.get('/user/create', messageController.user_create_get);
router.post('/user/post', messageController.user_create_post);

module.exports = router;
