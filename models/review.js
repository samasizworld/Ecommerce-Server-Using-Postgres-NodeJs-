module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      required: true,
    },
    comment: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  return Review;
};
