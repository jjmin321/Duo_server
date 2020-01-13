var express = require('express');
var app = express();
var port = 3000;
var login = require('./routes/login.js')
// 실험을 위한 코드
//routes 안에 있어야 함. 
var mysql = require('mysql');
var jwt = require("jsonwebtoken");

//로그인
var connection = mysql.createConnection({
    // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerz123'
    host : '127.0.0.1',
    user : 'root',
    password : 'qwerz123',
    port : '3306',
    database : 'duo'
});
connection.connect();
var user_info = {
  'id':'jjmin321',
  'pw':'qwerz123',
};
//primary key 인 유저의 id가 디비에 존재하는지를 확인하는 코드
connection.query("SELECT * FROM users where id = '"+user_info.id+"';", function(err, rows, fields) {
    if (!err){
      if (rows[0].id === user_info.id && rows[0].pw === user_info.pw) //아이디랑 비번이 일치하면 jwt 토큰을 줌
        console.log('The solution is: ', rows[0].id);
        console.log('로그인 완료');
    }
    else{
    console.log('Error while performing Query.', err);
    console.log('로그인 에러!');
    }
connection.end();
});

//로그인 

//회원가입
var user_signup = {
  'id':'jjhun231',
  'pw':'rmsfhr12',
  'name':'jejeongmin',
  'description':null
};
connection.query("delete from users where id = 'jjhun231'");
connection.query("INSERT INTO USERS (id,pw,name,description) VALUES('"+user_signup.id+"','"+user_signup.pw+"','"+user_signup.name+"','"+user_signup.description+"')", function(err, rows, fields) {
  if (!err){
    console.log('The solution is: ', rows);
    console.log('회원 가입 완료');
  }
  else{
  console.log('Error while perfoming Query.', err);
  console.log('회원 가입 에러!');
  }
});
//회원가입


//jwt 토큰 코드
app.get('/login', function(req, res) {
  res.json({
    text: "login",
  })
});
//jwt 토큰 코드

// 실험을 위한 코드
app.listen(port, () => console.log(`Example app listening on port ${port}!`));