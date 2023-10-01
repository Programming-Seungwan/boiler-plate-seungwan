const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// 암호화를 몇 자리로 시킬 것인지를 나타내는 것이 saltRounds이다
const saltRounds = 10;
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // trim은 공백을 없애준다
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    Number,
  },
});

// 저장하기 이전의 미들웨어에 해당함
userSchema.pre('save', function (next) {
  // 스키마를 가리키게 됨
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // index.js 에서의 에러 핸들링 미들웨어로 빠지게 됨
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        // 저장될 user 스키마의 비밀번호를 만든 hash 값으로 교체해준다
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
const User = mongoose.model('User', userSchema);

module.exports = { User };
