const express = require('express');
const router = express.Router();
const {
  loginUser,
  getUserProfile,
  registerUser,
  getAllUsers,
  updateUserProfile,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
//register user
router.route('/register').post(registerUser);

//routes for login
router.post('/login', loginUser);

//routes for get profile and update user profile
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

//route to get all user by admin only
router.route('/').get(auth, admin, getAllUsers);

//route to get user by id
router
  .route('/:id')
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser)
  .delete(auth, admin, deleteUser);

module.exports = router;
