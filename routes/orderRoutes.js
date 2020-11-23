const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
} = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
router.route('/').post(auth, addOrderItems);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/pay').get(auth, updateOrderToPaid);
router.route('/:id/deliver').get(auth, admin, updateOrderToDeliver);
module.exports = router;
