// /api/admin/check-jwt

const jwt = require('jsonwebtoken');

exports.ensureToken = function (req, res, next){
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

//jwt 토큰 확인하는 코드
exports.verifyToken = function(req, res) {
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
};
//jwt 토큰 확인하는 코드