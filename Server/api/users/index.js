const router = require('express').Router();
const signIn = require('./signin.js');
const signUp = require('./signup.js');
const deleteUser = require('./deleteUser.js');
const checkId = require('./checkId.js');
const alterUser = require('./alterUser.js');
const profile = require('./profile.js');
const middlewareToken = require('../../middleware/auth')
const image = require('./image.js')
const multer = require('multer');
const upload = multer({ dest : '../../../image/users_image/'})

// /api/users/sign-in
router.post('/sign-in', signIn.user);

// /api/users/sign-up
router.post('/sign-up', signUp.addUser);

// /api/users/upload-profile
router.post('/upload-profile', middlewareToken, upload.single('file'), image.uploadProfile);

// /api/users/delete
router.delete('/delete', middlewareToken, deleteUser.user)

// /api/users/check-id
router.get('/check-id', checkId.check);

// /api/users/alter/pw
router.put('/alter/pw', middlewareToken , alterUser.pw);

// /api/users/alter/name
router.put('/alter/name', middlewareToken, alterUser.name);

// /api/users/alter/description
router.put('/alter/description', middlewareToken, alterUser.description);

// /api/users/profile
router.get('/profile', profile.searchProfile);

module.exports = router;