const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const api = require('./api');

app.use('/api', api);

// 실험을 위한 코드
app.listen(port, () => {
  console.log(`Server is running at PORT ${port}!`)
});

