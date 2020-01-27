// /api/users/deleteUser

const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : 'qwerz123',
  port : '3306',
  database : 'duo'
});
connection.connect();
//회원탈퇴
exports.user = function(req, res) {
currentUser_id = req.query.id
if (currentUser_id !== 'jjmin321') {
  connection.query("DELETE FROM USERS WHERE id='"+currentUser_id+"';", function(err, rows, fields){
    console.log(rows.affectedRows);
    if(rows.affectedRows !== 0) {
      res.status(200).json({
        status: 200,
        message : '회원 탈퇴에 성공하였습니다.'
      })
    }else{
      res.status(400).json({
        status: 400,
        message : '존재하지 않는 회원입니다.'
      })
    }
  })
}else{
  res.status(400).json({
    status: 400,
    message : '관리자 계정입니다.'
  })
}
};
//회원탈퇴