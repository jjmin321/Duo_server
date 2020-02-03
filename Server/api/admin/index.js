const router = require('express').Router();
const userList = require('./userList.js');
const middlewareToken = require('../../middleware/auth')

// /api/admin/user-list
router.get('/user-list', middlewareToken, userList.checkUserList);

module.exports = router;