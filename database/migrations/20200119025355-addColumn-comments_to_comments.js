'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('comments_to_comments', 'tc_id', {
          type: Sequelize.INTEGER
        },
          { transaction: t }
        ),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('comments_to_comments', 'tc_id', {
          type: Sequelize.INTEGER
        },
          { transaction: t }
        ),
      ])
    })
  }
};
