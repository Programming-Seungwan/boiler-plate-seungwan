require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    `mongodb+srv://swsj4480:${process.env.mongoDBKEY}@seungwancluster1.uxzvlee.mongodb.net/`
  )
  .then(() => 'MongoDB Connected!')
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요');
});

app.post('/api/users/register', async (req, res) => {
  // 회원 가입 시, 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터베이스에 넣어준다
  const user = new User(req.body);
  const result = await user
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.json({ success: false, err }));
});

app.post('/api/users/login', async (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지를 찾는다
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    foundUser.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 일치하지 않습니다',
        });
      } else {
        foundUser.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          return res
            .cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      }
    });
  } catch (err) {
    return res.json({
      loginSuccess: false,
      message: '제공된 이메일에 해당하는 유저가 없습니다',
    });
  }
});

//auth 미들웨어를 중간에 등록해줌
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/users/logout', auth, async (req, res) => {
  try {
    const foundUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' }
    );
    return res.status(200).send({ success: true });
  } catch (err) {
    if (err) return res.json({ success: false, err });
  }
});

app.listen(4000, () => {
  console.log('I am listening!');
});
