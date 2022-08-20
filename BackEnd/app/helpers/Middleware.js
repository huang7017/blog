let jwt = require('jsonwebtoken');
const config = require('../config/JwtConfig');
const authentication = (req, res, next) => {
  let token;
  try {
    token = req.headers['authorization'].split(' ')[1];
  } catch (e) {
    token = '';
  }
  jwt.verify(token, config.JWT_SIGN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    } else {
      req.decoded = decoded;
      next();
    }
  });
};
module.exports = authentication;