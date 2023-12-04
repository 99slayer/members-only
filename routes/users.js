var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/user/detail', userController.user_detail);

router.get('/users', userController.user_list);

router.get('/user/create', userController.user_create_get);
router.post('/user/post', userController.user_create_post);

module.exports = router;
