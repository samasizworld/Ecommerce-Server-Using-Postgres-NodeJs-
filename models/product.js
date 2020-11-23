module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      required: true,
    },
    brand: {
      type: DataTypes.STRING,
      required: true,
    },
    category: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },

    numReviews: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      required: true,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 0,
    },
    countInStock: {
      type: DataTypes.INTEGER,
      required: true,
      defaultValue: 0,
    },
  });
  return Product;
};
