require('dotenv').config();
const express = require('express');
const app = express();
const { User } = require('./models/User');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있도록 도와주는 미들웨어를 등록
// applicatiopn/x-www-form-urlencoded 같은 데이터
app.use(bodyParser.urlencoded({ extended: true }));
// 이건 application/json을 가져올 수 있도록
app.use(bodyParser.json());
// key는 mongoDB의 connect와 관련된 것에 해당
mongoose
  .connect(
    `mongodb+srv://swsj4480:${process.env.mongoDBKEY}@seungwancluster1.uxzvlee.mongodb.net/`
  )
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/register', async (req, res) => {
  // 회원 가입 시, 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 넣어준다
  const user = new User(req.body);
  const result = await user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.listen(3000, () => {
  console.log('I am listening!');
});
