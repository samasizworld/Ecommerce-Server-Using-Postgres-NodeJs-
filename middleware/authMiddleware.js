const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const db = require('../models');

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // it means split makes string to array when there is space
      //eg "Bearer er9refosdoi0" => ['Bearer','er9refosdoi0'] where token is in index 1
      const jwt_privatekey = 'jwtsecret';
      const decoded = await jwt.verify(token, jwt_privatekey); // decpded gives user id that we sent as payload & issued at
      //& expires at
      console.log(decoded);
      req.user = await db.users.findByPk(decoded.id);
      console.log(req.user);
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = auth;
