module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('orderitem', {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    qty: { type: DataTypes.INTEGER, required: true },
    image: { type: DataTypes.STRING, required: true },
    price: { type: DataTypes.FLOAT, required: true },
  });

  return OrderItem;
};
