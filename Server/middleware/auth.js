// /api/admin/check-jwt

const jwt = require('jsonwebtoken');
const current_time = require('../../../library/current_time');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : 'qwerz123',
  port : '3306',
  database : 'duo'
});
connection.connect();

module.exports = function (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    const token = req.token
    if (!token) {
      return res.status(400).json({
        status: 400,
        message: '토큰이 전송되지 않았습니다.',
      });
    }
    try {
      jwt.verify(token, 'my_secret_key', function(err, data){
        if (err) {
          res.sendStatus(403);
        } else {
          // res.json({
          //   text: 'this is protected',
          //   token: req.token,
          //   data: data,
          // });
          connection.query("SELECT * FROM USERS WHERE id ='"+data.id+"';", function(err, rows, fields) {
            if (rows[0] !== undefined){
              req.user = rows[0].id
              console.log("Give token - "+req.user+"  "+current_time.getDateTime())
              return next();
            }
          }) 
        }
      }); 
        } catch (err) {
          switch (err.message) {
            case 'jwt must be provided':
              return res.status(400).json({
                status: 400,
                message: '토큰이 전송되지 않았습니다.',
              });
              case 'jwt malformed':
                case 'invalid token':
                  case 'invalid signature':
                    return res.status(401).json({
                      status: 401,
                      message: '위조된 토큰입니다.',
                    });
                    case 'jwt expired':
                      return res.status(410).json({
                        status: 410,
                        message: '토큰이 만료되었습니다.',
                      });
                      default:
                        console.log(err.message);
                        return res.status(500).json({
                          status: 500,
                          message: '다시 시도해 주세요.',
                        });
                      }
                    }
                  };
                };