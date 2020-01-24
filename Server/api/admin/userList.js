// /api/admin/user-list

const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : 'qwerz123',
  port : '3306',
  database : 'duo'
});
connection.connect();
//회원 정보 데이터베이스 확인
exports.checkUserList = function(req, res) {
connection.query("SELECT * FROM USERS;", function(err, rows, fields){
  res.status(200).json({
    users : rows
  })
});
};
//회원 정보 데이터베이스 확인 