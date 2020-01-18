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
//primary key 인 유저의 id가 디비에 존재하는지를 확인하는 코드
app.get('/api/login', function(req, res){
  var user_info = {
    id : req.query.id,  //아이디가 틀리니까 에러뜨고 서버 꺼짐
    pw : req.query.pw   //비밀번호가 틀려도 에러뜨고 서버 꺼짐
    // id:'jjmin321',
    // pw:'qwerz123',
  };
  try{
    connection.query("SELECT * FROM users where id = '"+user_info.id+"' AND pw = '"+user_info.pw+"';", function(err, rows, fields) {
    //token 코드 알려주는 코드 
    //iat: issued at(토큰이 발급된 시간을 알려줌)
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImpqbWluMzIxIiwicHciOiJxd2VyejEyMyIsImlhdCI6MTU3OTI0NDc1OX0.KjNOYhHhFy2be4tV8O5h3-_fpcm8GwiYHni2itdO5Ow
    if (!err){
      if (rows[0].id === user_info.id && rows[0].pw === user_info.pw){ //아이디랑 비번이 일치하면 jwt 토큰을 줌
        console.log('The solution is: ', rows[0].id); //id 출력
        const user = {
          id:rows[0].id,  // == "id":rows[0].id
          pw:rows[0].pw
        };
        const token = jwt.sign( user , 'my_secret_key');
        res.cookie("It's jwt!", token);
        console.log("jwt used : ", token);
        res.json({
          token:token
        })
        console.log('로그인 완료');
      }
    }
    else{
      console.log('Error while performing Query.', err);
      console.log('로그인 에러!');
    }
  });
}
catch(err){
  console.log("에러 떳어");
}
// connection.end();
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
app.get('/api/protected', ensureToken, function(req, res) {
  //KEY : Authorization
  //VALUE : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImpqbWluMzIxIiwicHciOiJxd2VyejEyMyIsImlhdCI6MTU3OTI0NDc1OX0.KjNOYhHhFy2be4tV8O5h3-_fpcm8GwiYHni2itdO5Ow
  //토큰 받았는지 확인
  jwt.verify(req.token, 'my_secret_key', function(err, data) {
  if (err) {
    res.sendStatus(403);
  } else {
    res.json({
      text: 'this is protected',
      token: req.token,
      data: data
    }); 
  }
});
});

function ensureToken(req, res, next){
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
//jwt 토큰 코드

// 실험을 위한 코드
app.listen(port, () => {
  console.log(`Server is running at PORT ${port}!`)
});

