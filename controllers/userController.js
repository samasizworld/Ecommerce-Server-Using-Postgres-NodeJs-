const asyncHandler = require('express-async-handler');
const db = require('../models');
//Encrypt Password
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken'); //curly baraket makes exact stuff import
const user = require('../models/user');

// @desc - register user by login
//routes - api/users/register
//access - public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await db.users.findOne({ where: { email } });
  if (existUser) {
    res.status(400);
    throw new Error('User already existed');
  }
  const registeredUser = await db.users.create({
    name,
    email,
    password,
  });
  if (registeredUser) {
    res.status(201).json({
      id: registeredUser.id,
      email: registeredUser.email,
      isAdmin: registeredUser.isAdmin,
      token: generateToken(registeredUser.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user Data');
  }
});

// @desc - authenticate user by login
//routes - api/users/login
//access - public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findOne({ where: { email } });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});
//@desc- get login user profile
//route- api/users/profile
//access - private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await db.users.findByPk(req.user.id, {
    attributes: { exclude: ['password'] },
  }); // req.user.id is loggin user id
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not Found');
  }
});

//desc- get all users
//route- api/users
//access -admin/private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await db.users.findAll();
  res.json({ users });
});

//desc update user profile
//route- PUT api/users/profile
//access -private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.user.id);
  const user = await db.users.findByPk(req.user.id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.json({ updatedUser });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//desc- getuserbyid
//route -api/users/:id
//access - admin/private
const getUserById = asyncHandler(async (req, res) => {
  const user = await db.users.findByPk(req.params.id, {
    attributes: { exclude: ['password'] },
  });
  if (user) {
    res.json({ user });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//desc update user profile
//route- PUT api/users/:id
//access -private/admin
const updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  console.log(req.user.id);
  const user = await db.users.findByPk(req.params.id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;
    const updatedUser = await user.save();
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//desc -delete user profile
//route- PUT api/users/:id
//access -private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await db.users.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({
      message: 'User removed',
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  loginUser,
  getUserProfile,
  registerUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUser,
  deleteUser,
};
