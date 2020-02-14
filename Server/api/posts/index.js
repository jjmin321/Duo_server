const router = require('express').Router();
const middlewareToken = require('../../middleware/auth');
const addPost = require('./addPost.js');

// /api/posts/addpost
router.post('/addpost', middlewareToken, addPost);

module.exports = router;