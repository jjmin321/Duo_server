const express = require('express');
const path = require('path')
const app = express();
const port = 3000;
const mysql = require('mysql');
const api = require('./api');
const current_time = require('../../library/current_time');

app.use('/api', api);

app.use('/static', express.static(path.join(__dirname, '../image')))
// 실험을 위한 코드
app.listen(port, () => {
  console.log(`Server is running at PORT ${port}!`, current_time.getDateTime());
});

