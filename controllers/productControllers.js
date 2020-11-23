const asyncHandler = require('express-async-handler');
const db = require('../models');

// @desc -Fetch all products
//routes - api/products
//access - public
const getProducts = asyncHandler(async (req, res) => {
  const products = await db.products.findAll({ include: [db.reviews] }); // Select * from products
  res.json(products);
});

// @desc -Fetch single product
//routes - api/products
//access - public
const getProductById = asyncHandler(async (req, res) => {
  const product = await db.products.findByPk(req.params.id, {
    include: [db.reviews],
  });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Products not found');
  }
});

// @desc -Fetch single product
//routes - DELETE api/products/:id
//access - private/admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await db.products.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Products not found');
  }
});

// @desc -Create single product
//routes - POST api/products
//access - private/admin
const createProduct = asyncHandler(async (req, res) => {
  await db.products.create({
    name: 'sample name',
    price: 0,
    image: 'images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
    userId: req.user.id,
  });

  res.status(201).json({ message: 'Product Created' });
});

const updateProductById = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;
  const product = await db.products.findByPk(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;
    product.description = description;
    const updatedProduct = await product.save();
    res.json({ updatedProduct });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProductById,
};
