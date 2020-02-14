const router = require('express').Router();

// /api/admin
router.use('/admin', require('./admin'));

// /api/posts
router.use('/posts', require('./posts'));

// /api/users
router.use('/users', require('./users'));

module.exports = router;