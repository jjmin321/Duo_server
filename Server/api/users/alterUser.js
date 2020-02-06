// /api/users/alter

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

//비밀번호변경
exports.pw = function(req, res){
  const user = {
    //   id : req.query.id,
        id : req.user,
      want : req.query.want
  }
  console.log('/api/users/alter/pw', current_time.getDateTime(), user)
  connection.query("UPDATE USERS SET pw = '"+user.want+"' WHERE id = '"+user.id+"';", function(err, rows, fields){
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
    const user = {
        id : req.user,
        want : req.query.want
    }
    console.log('/api/users/alter/name', current_time.getDateTime(), user)
    connection.query("UPDATE USERS SET name = '"+user.want+"' WHERE id = '"+user.id+"';", function(err, rows, fields){
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
    const user = {
        id : req.user,
        want : req.query.want
    }
    console.log('/api/users/alter/description', current_time.getDateTime(), user)
    connection.query("UPDATE USERS SET description = '"+user.want+"' WHERE id = '"+user.id+"';", function(err, rows, fields){
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