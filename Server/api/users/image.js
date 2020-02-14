// /api/users/uploadProfile

const fs = require('fs');
const path = require('path'); 
const current_time = require('../../../../library/current_time');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : 'qwerz123',
  port : '3306',
  database : 'duo'
});
connection.connect();

exports.uploadProfile = function (req, res)  {
  console.log('/api/users/uploadProfile', current_time.getDateTime(), 'currentUser_id = ', req.user);
  currentUser_id = req.user;  
  console.log(req.file, current_time.getDateTime())
  if (!req.file) {
    console.log('검증 오류입니다');
    return res.status(400).json({
      status: 400,
      message: '검증 오류입니다.',
    });
  } 
  connection.query(`UPDATE USERS SET image = '${req.file.filename}' WHERE id = '${currentUser_id}';`, function(err, rows, fields){
    try {
      return res.status(200).json({
        status: 200,
        message: '프로필 사진 업로드에 성공하였습니다.',
      });
    } catch (err) {
      console.log(err.message)
      return res.status(500).json({
        status: 500,
        message: '프로필 사진 업로드에 실패하였습니다.',
      });
    }
  })
};

exports.getProfileUrl = function (user_id) {
connection.query(`SELECT image FROM users WHERE id = '${user_id}';`, function(err, rows, fields){
  image = rows[0].image
  try{
  if (!fs.existsSync(path.join(__dirname, `../../../image/users_image/${image}`))) {
    image = null;
  }
  if (!image) {
    profileUrl = `/static/users_image/jjmin321_1581074532803_rest.png`;
  } else {
    profileUrl = `/static/users_image/${image}`;
  }
  console.log("profileUrl = ", profileUrl, current_time.getDateTime())
  return profileUrl;
  }
  catch(err){
    console.log(err)
    return null;
  }
})
};