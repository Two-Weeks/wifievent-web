const { User } = require('../../models');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

//로그인
const login = async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.log(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ msg: "No Authentication" });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json({ msg: "login success" });
    });
  })(req, res, next);
}

//회원가입
const register = async (req, res, next) => {
  const { uid, pw, name, email } = req.body;
  const is_admin = false;

  const result = await User.count({
    where: {
      uid: uid
    }
  }).catch((e) => {
    console.error(err);
    return next(err);
  });

  if (result === 1) {
    return res.status(304).json({ msg: "userid already exist" });
  }
  else {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({ msg: "Bcrypt genSalt error" });
      }
      else {
        bcrypt.hash(pw, salt, null, (err, hash) => {
          if (err) {
            return res.status(500).json({ msg: "Bcrpyt hashing error" });
          }
          else {
            User.create({
              uid,
              pw: bcrypt.hashSync(pw),
              name,
              email,
              is_admin
            }).catch((e) => {
              console.error(e);
              return next(e);
            });
            return res.status(201).json({ msg: "register success" });
          }
        });
      }
    })
  }
}

//유저 삭제
const remove = async (req, res, next) => {
  const uid = req.user.dataValues.uid; //현재 로그인된 아이디
  const id = req.params.id;

  //관리자도 아니고 해당 유저가 아니라면
  if (uid != id && !req.user.dataValues.is_admin) return res.status(403).json({ msg: "No Authentication" });

  //유저 삭제
  const result = User.destroy({
    where: { uid: id },
  }).catch((e) => {
    console.error(err);
    return next(err);
  });

  if (!result) return res.status(400).json({ msg: "cannot find id" });
  return res.status(200).json({ msg: "Remove success" });
}

//로그아웃
const logout = async (req, res, next) => {
  req.logout();
  req.session.destroy(); //세션 파괴
  return res.status(200).json({ msg: "Logout success" });
}

module.exports = {
  login,
  register,
  remove,
  logout
}