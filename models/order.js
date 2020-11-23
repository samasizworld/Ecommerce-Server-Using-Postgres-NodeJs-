const db = require('./index');
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      // shippingAddress: { type: DataTypes.STRING, required: true },
      // shippingpostalCode: { type: DataTypes.STRING, required: true },
      // shippingcity: { type: DataTypes.STRING, required: true },
      //shippingCountry: { type: DataTypes.STRING, required: true },

      shippingAddress: {
        type: DataTypes.JSON,
        required: true,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        required: true,
      },
      paymentResult: {
        type: DataTypes.JSON,
        required: true,
      },
      taxPrice: {
        type: DataTypes.FLOAT,
        required: true,
        defaultValue: 0.0,
      },
      shippingPrice: {
        type: DataTypes.FLOAT,
        required: true,
        defaultValue: 0.0,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        required: true,
        defaultValue: 0.0,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
      },
      paidAt: {
        type: DataTypes.DATE,
      },

      isDelivered: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
      },
      deliverAt: {
        type: DataTypes.DATE,
      },
    },
    { timestamps: false }
  );
  return Order;
};
