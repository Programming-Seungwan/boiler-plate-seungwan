require('dotenv').config();
const express = require('express');
const app = express();
const { User } = require('./models/User');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있도록 도와주는 미들웨어를 등록
// applicatiopn/x-www-form-urlencoded 같은 데이터
app.use(bodyParser.urlencoded({ extended: true }));
// 이건 application/json을 가져올 수 있도록
app.use(bodyParser.json());
app.use(cookieParser());
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

app.post('/login', async (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지를 찾는다
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    foundUser.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 일치하지 않습니다',
        });
      }
    });

    foundUser.generateToken((err, user) => {
      if (err) res.status(400).send(err);
      res
        .cookie('x_auth', user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });
  } catch (err) {
    return res.json({
      loginSuccess: true,
      message: '제공된 이메일에 해당하는 유저가 없습니다',
    });
  }

  // User.findOne({ email: req.body.email }, (err, userInfo) => {
  //   if (!userInfo) {
  //     return res.json({
  //       loginSuccess: false,
  //       message: '제공된 이메일에 해당하는 유저가 없습니다',
  //     });
  //   }
  //   // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
  //   // 비밀번호를 비교하는 메서드를 만든다
  //   userInfo.comparePassword(req.body.password, (err, isMatch) => {
  //     if (!isMatch) {
  //       return res.json({
  //         loginSuccess: false,
  //         message: '비밀번호가 틀렸습니다',
  //       });
  //     }
  //     // generateToken은 실패하면 에러만 가진 콜백을, 성공하면 에러는 null이고 토큰 정보를 가진 user을 가져옴
  //     userInfo.generateToken((err, user) => {
  //       if (err) return res.status(400).send(err);
  //       // token을 쿠키 & 로컬 스토리지 등 여러 군데에 저장할 수 있음
  //       res
  //         .cookie('x_auth', user.token)
  //         .status(200)
  //         .json({ loginSuccess: true, userId: user._id });
  //     });
  //   });
  // });
});

app.listen(3000, () => {
  console.log('I am listening!');
});
