// /api/users/profile

const mysql = require('mysql');
const connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'qwerz123',
    port : '3306',
    database : 'duo'
});
connection.connect();

//유저 프로필 정보
exports.searchProfile = function(req, res) {
    currentUser_id = req.query.id
    connection.query("SELECT * FROM USERS WHERE id='"+currentUser_id+"';", function(err, rows, fields){
        if (rows[0] !== undefined){
            res.status(200).json({
                status : 200,
                user_profile : rows,
                message : 'ok'
            })
        }else{
            res.status(400).json({
                status : 400,
                message : '해당 유저의 정보를 찾을 수가 없습니다.'
            })
        }
    });
};
//유저 프로필 정보