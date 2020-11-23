const asyncHandler = require('express-async-handler');
const db = require('../models');

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Order not found');
  } else {
    orderItems.map((item) => {
      name = item.name;
      qty = item.qty;
      image = item.image;
      price = item.price;
      productId = item.productId;
      return;
    });
    const ordereditems = await db.orderitems.create({
      name,
      qty,
      image,
      price,
      productId,
    });
    if (ordereditems) {
      await db.orders.create({
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        userId: req.user.id,
        orderitemId: ordereditems.id,
      });
      const order = await db.orders.findAll({ include: [db.orderitems] });
      res.json({ order });
    } else {
      res.status(404);
      throw new Error('Order items not found');
    }
  }
});

//desc - get order by id
//route GET /api/orders/:id
//access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await db.orders.findByPk(req.params.id, {
    include: [db.orderitems, db.users],
  });
  if (order) {
    res.json({ order });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//desc - update deliver  by id
//route GET /api/orders/:id/deliver
//access Private/admin

const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await db.orders.findByPk(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliverAt = new Date();

    const updatedOrder = await order.save();
    res.json({ updatedOrder });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//desc - update order by id
//route GET /api/orders/:id/pay
//access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await db.orders.findByPk(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json({ updatedOrder });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
};
