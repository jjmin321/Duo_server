// /api/users/check-id

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

//ID 중복 체크
exports.check = function(req, res){
  console.log('/api/users/check-id', current_time.getDateTime());
  const id = req.query.id;
  console.log(id);
  connection.query("SELECT * FROM USERS WHERE ID = '"+id+"';", function(err, rows, fields){
    if (rows[0] === undefined){
      res.status(200).json({
        status : 200,
        message : '사용 가능한 아이디입니다'
      })
    }else{
      res.status(400).json({
        status : 400,
        message : '이미 사용중인 아이디입니다'
      })
    }
  })
}
//ID 중복 체크