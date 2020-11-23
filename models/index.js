'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//importing models
db.users = require('./user')(sequelize, Sequelize);
db.products = require('./product')(sequelize, Sequelize);
db.reviews = require('./review')(sequelize, Sequelize);
db.orders = require('./order')(sequelize, Sequelize);
db.orderitems = require('./orderItem')(sequelize, Sequelize);

//Defining Association

//1-M between users model and products
db.users.hasMany(db.products, {
  onDelete: 'cascade',
  foreignKey: { allowNull: false },
}); // products ma user id add hunxa
db.products.belongsTo(db.users);

//1-1 between users model and products
db.users.hasOne(db.reviews, {
  onDelete: 'cascade',
  foreignKey: { allowNull: false },
}); //reviews ma user id add hunxa
db.reviews.belongsTo(db.users);

//1-M between users and products
db.users.hasMany(db.orders, {
  onDelete: 'cascade',
  foreignKey: { allowNull: false },
}); // orders ma user id add hunxa
db.orders.belongsTo(db.users);

//1-M between OrderItem and products
db.orderitems.belongsTo(db.products, {
  onDelete: 'cascade',
  allowNull: false,
}); //orderitems ma product id add hunxa
db.products.hasOne(db.orderitems);

//1-M between product and reviews
db.products.hasMany(db.reviews, {
  onDelete: 'cascade',
  foreignKey: { allowNull: false },
}); //reviews ma product id add hunxa
db.reviews.belongsTo(db.products);

//1-M between order and orderitems
db.orderitems.hasMany(db.orders, {
  onDelete: 'cascade',
  foreignKey: { allowNull: false },
}); //order ma orderitemid add hunxa
db.orders.belongsTo(db.orderitems);

module.exports = db;
