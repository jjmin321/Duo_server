// /api/users/alter

const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : 'qwerz123',
  port : '3306',
  database : 'duo'
});
connection.connect();

//비밀번호변경
exports.pw = function(req, res){
  const pw = {
      now : req.query.now,
      want : req.query.want
  }
  console.log(pw);
  connection.query("UPDATE USERS SET pw = '"+pw.want+"' WHERE pw = '"+pw.now+"';", function(err, rows, fields){
    if (!err){
        res.status(200).json({
            status : 200,
            message : '성공적으로 변경되었습니다'
        })
    }else{
        res.status(400).json({
            status : 400,
            message : '변경에 실패하였습니다'
        })
    }
  })
}
//비밀번호 변경


//이름 변경
exports.name = function(req, res){
    const name = {
        now : req.query.now,
        want : req.query.want
    }
    console.log(name);
    connection.query("UPDATE USERS SET name = '"+name.want+"' WHERE name = '"+name.now+"';", function(err, rows, fields){
      if (!err){
          res.status(200).json({
              status : 200,
              message : '성공적으로 변경되었습니다'
          })
      }else{
          res.status(400).json({
              status : 400,
              message : '변경에 실패하였습니다'
          })
      }
    })
  }
//이름 변경


//자기소개 변경
exports.description = function(req, res){
    const description = {
        now : req.query.now,
        want : req.query.want
    }
    console.log(description);
    connection.query("UPDATE USERS SET description = '"+description.want+"' WHERE pw = '"+description.now+"';", function(err, rows, fields){
      if (!err){
          res.status(200).json({
              status : 200,
              message : '성공적으로 변경되었습니다'
          })
      }else{
          res.status(400).json({
              status : 400,
              message : '변경에 실패하였습니다'
          })
      }
    })
  }
//자기소개 변경