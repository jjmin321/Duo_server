const router = require('express').Router();
const checkJwt = require('./checkJwt.js');
const userList = require('./userList.js');

// /api/admin/user-list
router.get('/user-list', userList.checkUserList);

// /api/admin/check-jwt
router.get('/check-jwt', checkJwt.ensureToken, checkJwt.verifyToken);

module.exports = router;