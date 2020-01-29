// /api/admin/user-list

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
//회원 정보 데이터베이스 확인
exports.checkUserList = function(req, res) {
console.log('/api/admin/user-list', current_time.getDateTime());
connection.query("SELECT * FROM USERS;", function(err, rows, fields){
  res.status(200).json({
    users : rows
  })
});
};
//회원 정보 데이터베이스 확인 