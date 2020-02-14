// /api/users/sign-up

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
//회원가입
exports.addUser = function(req, res) {
var user_signup = {
  'id':req.query.id,
  'pw':req.query.pw,
  'name':req.query.name,
  'description':req.query.description
};
console.log('/api/users/sign-up', current_time.getDateTime(), user_signup);
connection.query("INSERT INTO USERS (id,pw,name,description) VALUES('"+user_signup.id+"','"+user_signup.pw+"','"+user_signup.name+"','"+user_signup.description+"');", function(err, rows, fields) {
  if (!err){
    res.status(200).json({
      status: 200,
      message: '회원가입이 완료되었습니다.'
    })
  }
  else{
    res.status(400).json({
      status: 400,
      message: '회원가입에 실패하였습니다.'
    })
  }
});
};
//회원가입