//routes 안에 있어야 함. 
var mysql = require('mysql');
var jwt = require("jsonwebtoken");

module.exports = function(app) {
//데이터베이스
var connection = mysql.createConnection({
    // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'qwerz123'
    host : '127.0.0.1',
    user : 'root',
    password : 'qwerz123',
    port : '3306',
    database : 'duo'
});
connection.connect();
var id = "jjmin321"
//primary key 인 유저의 id가 디비에 존재하는지를 확인하는 코드
connection.query("SELECT * FROM users where id = '"+id+"';", function(err, rows, fields) {
    if (!err){
        console.log('The solution is: ', rows);
        // console.log('Id is: ', rows[0].id);
        // console.log('Pw is: ', rows[0].pw);
        // console.log('Name is: ', rows[0].name);
        // console.log('Description is: ', rows[0].description);
        // console.log('user_created is: ', rows[0].user_created);
    }
    else
    console.log('Error while performing Query.', err);
connection.end();
});

//json
var obj = {'key':'value'};
console.log(obj)
 console.log(
             /* define stringify */
             JSON.stringify(obj)
 );

//jwt
app.get("/login", function(req,res){
    res.send("Hello JWT");
    //토큰 내용
    var token = jwt.sign({
        id: "jjmin321"   // 토큰의 내용(payload)
    },
    login.secret ,    // 비밀 키
    {
        expiresIn: '5m'    // 유효 시간은 5분
    })
    //토큰 내용
});
}