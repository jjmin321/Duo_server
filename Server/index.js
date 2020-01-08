var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    // host : '221.168.22.204',
    host : '127.0.0.1',
    user : 'root',
    password : 'qwerz123',
    port : '3306',
    database : 'duo'
});
// var login = require('./routes/loginroutes');
var port = 3000;

//데이터베이스 연동
connection.connect();

connection.query('SELECT * FROM users', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows, fields);
    else
      console.log('Error while performing Query.', err);
  });
  
connection.end();
//데이터베이스 연동

app.get('/', function (req, res) {
    res.send('Hello World!!');
});
    
app.post('/', function (req, res) {
    res.send('Got a POST request');
});

console.log("Hi!")

app.listen(port, () => console.log(`Example app listening on port ${port}!`));