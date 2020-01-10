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
//데이터베이스 연동


//로그인 처리 및 토큰 생성
var models = require("./models/index.js"); //Sequelize ORM
var jwt = require("jsonwebtoken");
var login = require('./config/jwt.js');
// var router = express.Router();
models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})
app.get("/login", function(req,res,next){
  res.send("hi");
  var token = jwt.sign({
    id: "jjmin321"   // 토큰의 내용(payload)
  },
  login.secret ,    // 비밀 키
  {
    expiresIn: '5m'    // 유효 시간은 5분
  })
  models.duo.find({
    where: {
       id: "jjmin321"
    }
  })
  .then( duo => {
    if(duo.pw === "qwerz123"){
      res.cookie("user", token);
      res.json({
        token: token
      })
    }
   })
 })
module.exports = express.Router();
//로그인 처리 및 토큰 생성

connection.end();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));