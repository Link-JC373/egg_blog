'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'name', 'username')

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'username', 'name')

  }
};
