const { User } = require('../models/User');

// 인증 처리를 해주는 미들웨어
const auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰을 가져온다(기존의 쿠키에 토큰이 저장되어 있음)
  let token = req.cookies.x_auth;
  // 토큰을 복호화한 후, 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // req.token은 응답에서 안 쓸건데 왜??
    req.token = token;
    req.user = user;
    next();
  });
  // 유저가 있으면 인증 ok, 없으면 인증 no
};

module.exports = { auth };
