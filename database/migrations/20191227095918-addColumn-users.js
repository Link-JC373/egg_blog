'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('users', 'user_icon', {
          type: Sequelize.STRING
        },
          { transaction: t }
        ),
        queryInterface.addColumn('users', 'disc', {
          type: Sequelize.STRING
        },
          { transaction: t }
        ),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('users', 'password', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.removeColumn('users', 'email', {
          type: Sequelize.STRING,
        }, { transaction: t })
      ])
    })
  }
};
