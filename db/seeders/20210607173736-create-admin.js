'use strict';

const bcrypt = require('bcrypt')
const config = require('../../config')
const saltRounds=10

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash(config.ADMIN_PASSWORD || "sunshine", saltRounds)

    await queryInterface.bulkInsert('Users', [{
      username: 'bimbim',
      password: passwordHash,
      name: 'Bim',
      breed: 'Corgi',
      isAdmin: true
    }])
  },

  down: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash(config.ADMIN_PASSWORD || "sunshine", saltRounds)

    await queryInterface.bulkDelete('Users', [{
      username: 'bimbim',
      password: passwordHash,
      name: 'Bim',
      breed: 'Corgi',
      isAdmin: true
    }])
  }
};
