const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
  createProductReview,
  searchProducts,
} = require('../controllers/productControllers');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// just like router.get('/',getProducts)
router.route('/').get(getProducts).post(auth, admin, createProduct);
router.route('/search').get(searchProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(auth, admin, deleteProductById)
  .put(auth, admin, updateProductById);

router.route('/:id/review').post(auth, createProductReview);

module.exports = router;
