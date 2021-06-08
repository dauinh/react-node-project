'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [{
      item: 'Nothing to do today'
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', [{
      item: 'Nothing to do today'
    }])
  }
};
