const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// 스키마에 methods로 메서드를 만들어주면 모델 인스턴스에서 사용할 수 있음
// index.js에서 findOne()의 결과물은 스키마로 만든 모델의 인스턴스니까 아래 메서드를 쓸 수 있음
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  // jsonwebtoken을 이용해서 token을 생성하기
  // id와 서버 단의 정보(문자열)을 이용해서 토큰을 만들어냄
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user
    .save()
    .then(() => cb(null, user))
    .catch((err) => cb(err));
};
const User = mongoose.model('User', userSchema);

module.exports = { User };
