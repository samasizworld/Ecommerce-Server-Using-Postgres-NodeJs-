const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: async function (user) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );
  User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};
