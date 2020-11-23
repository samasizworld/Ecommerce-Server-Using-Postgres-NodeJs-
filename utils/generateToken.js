const jwt = require('jsonwebtoken');
const generateToken = (id) => {
  const jwt_privatekey = 'jwtsecret';
  return jwt.sign({ id }, jwt_privatekey, {
    expiresIn: '30d',
  });
};

module.exports = { generateToken };
