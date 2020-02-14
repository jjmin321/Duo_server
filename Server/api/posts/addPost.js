// /api/posts/addpost

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
//게시물 생성
module.exports = function(req, res) {
    console.log('/api/posts/addpost', current_time.getDateTime(), `- ${req.user}`);
    const post = {
        title : req.query.title,
        description : req.query.description,
        user_id : req.user
    }
    connection.query(`INSERT INTO POSTS(title, description, user_id) VALUES('${post.title}', '${post.description}', '${post.user_id}');`, function(err, rows, fields){
        if(!err){
            res.status(200).json({
                status: 200,
                message: '게시물이 성공적으로 등록되었습니다!'
            })
        }else{
            res.status(400).json({
                status: 400,
                message: '게시물 등록에 실패하였습니다'
            })
        }
    }); 
};
//게시물 생성  