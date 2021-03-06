const router = require('express').Router();
const middlewareToken = require('../../middleware/auth');
const addPost = require('./addPost.js');
const multer = require('multer');

const storage = multer.diskStorage({
    //파일 저장경로, 파일이름설정
      destination: function (req, file, cb) {
        cb(null, 'image/posts_image/');
      },
      filename: function (req, file, cb) {
        cb(null, `${req.user}_${Date.now()}_${file.originalname}`);
      },
      limits : {
        files : 3,
        filesize : 1024 * 1024 * 1024,
      }
  });
  
  const upload = multer({ storage : storage })

// /api/posts/addpost
router.post('/addpost', middlewareToken, upload.array('posts_image', 3), addPost);

module.exports = router;