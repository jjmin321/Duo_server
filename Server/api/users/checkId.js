// /api/users/check-id

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
  const id = req.query.id;
  console.log(id);
  connection.query("SELECT * FROM USERS WHERE ID = '"+id+"';", function(err, rows, fields){
    if (rows[0] === undefined){
      res.send("사용 가능한 아이디입니다");
    }else{
      res.send("이미 사용중인 아이디입니다");
    }
  })
}
//ID 중복 체크