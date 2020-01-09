var express = require('express');
var app = express();
var port = 3000;

//데이터베이스 연동
var mysql = require('mysql');
var connection = mysql.createConnection({
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerz123'
  host : '127.0.0.1',
  user : 'root',
  password : 'qwerz123',
  port : '3306',
  database : 'duo'
});
connection.connect();
connection.query('SELECT * FROM users', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.', err);
  });
connection.end();
//데이터베이스 연동


//로그인 처리 및 토큰 생성
// var jwt = require("jsonwebtoken");
// var login = require('./routes/login.js');
// router.get("/login", function(req,res,next){
//   let token = jwt.sign({
//     id: "jjmin321"   // 토큰의 내용(payload)
//   },
//   login.secret ,    // 비밀 키
//   {
//     expiresIn: '5m'    // 유효 시간은 5분
//   })
//   models.user.find({
//     where: {
//       id: "jjmin321"
//     }
//   })
//   .then( user => {
//     if(user.pwd === "1234"){
//       res.cookie("user", token);
//       res.json({
//         token: token
//       })
//     }
//   })
// })
// module.exports = router;
//로그인 처리 및 토큰 생성

app.listen(port, () => console.log(`Example app listening on port ${port}!`));