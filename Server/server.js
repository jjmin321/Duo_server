var express = require('express');
var app = express();
var port = 3000;
// 실험을 위한 코드
//routes 안에 있어야 함. 
var mysql = require('mysql');
var jwt = require("jsonwebtoken");

//jwt 토큰 생성 함수
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
//jwt 토큰 생성 함수

//디비 연결 
var connection = mysql.createConnection({
    // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerz123'
    host : '127.0.0.1',
    user : 'root',
    password : 'qwerz123',
    port : '3306',
    database : 'duo'
});
connection.connect();
//디비 연결

//로그인
//primary key 인 유저의 id가 디비에 존재하는지를 확인하는 코드
app.post('/api/signIn', function(req, res){
  var user_info = {
    id : req.query.id,  //아이디가 틀리니까 에러뜨고 서버 꺼짐
    pw : req.query.pw   //비밀번호가 틀려도 에러뜨고 서버 꺼짐
    // id:'jjmin321',
    // pw:'qwerz123',
  };
    connection.query("SELECT * FROM users where id = '"+user_info.id+"' AND pw = '"+user_info.pw+"';", function(err, rows, fields) {
    //token 코드 알려주는 코드 
    //iat: issued at(토큰이 발급된 시간을 알려줌)
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
        res.status(200).json({
          token:token,
          status : 200,
          message : 'OK'
          // message : '로그인에 성공하였습니다.'
        })
        console.log('로그인 완료');
        // res.status(200).json({ status : 200, message : '로그인에 성공하였습니다.' });
      }else{
        console.log("dddd");
      }
    }
    else{
      res.status(400).json({
        status : 400,
        message : '아이디나 비밀번호가 잘못되었습니다.'
      })
      console.log('Error while performing Query.', err);
      console.log('로그인 에러!');
    }
  });
});
//로그인 

//회원가입
app.post('/api/signUp', function(req, res) {
  var user_signup = {
    'id':req.query.id,
    'pw':req.query.pw,
    'name':req.query.name,
    'description':req.query.description
  };
  connection.query("INSERT INTO USERS (id,pw,name,description) VALUES('"+user_signup.id+"','"+user_signup.pw+"','"+user_signup.name+"','"+user_signup.description+"')", function(err, rows, fields) {
    if (!err){
      // res.send('The solution is: ', rows);
      res.status(200).json({
        status: 200,
        message: '회원가입이 완료되었습니다.'
      })
      // console.log('The solution is: ', rows);
      // console.log('회원 가입 완료');
    }
    else{
      // res.send('Error while performing Query.', err);
      res.status(400).json({
        status: 400,
        message: '회원가입에 실패하였습니다.'
      })
    // console.log('Error while perfoming Query.', err);
    // console.log('회원 가입 에러!');
    }
  });
});
//회원가입


//관리자
app.post('/api/admin', function(req, res) {
connection.query("SELECT * FROM USERS;", function(err, rows, fields){
    res.status(200).json({
      status: 200,
      message : '회원 목록',
      users : rows
    })
});
});
//관리자 

//회원탈퇴
app.post('/api/deleteAccount', function(req, res) {
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
})
//


//jwt 토큰 확인하는 코드
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
//jwt 토큰 확인하는 코드


// 실험을 위한 코드
app.listen(port, () => {
  console.log(`Server is running at PORT ${port}!`)
});

