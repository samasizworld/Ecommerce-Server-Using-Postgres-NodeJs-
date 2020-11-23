'use strict';
const products = require('../data/products');
const users = require('../data/users');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = users[0].id;
    console.log(userId);
    const sampleProducts = products.map((product) => {
      return { ...product, userId };
    });
    return await queryInterface.bulkInsert('products', sampleProducts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
