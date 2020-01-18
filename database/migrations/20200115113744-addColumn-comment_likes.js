'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('comment_likes', 'visitor_id', {
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
        queryInterface.removeColumn('comment_likes', 'visitor_id', {
          type: Sequelize.INTEGER
        },
          { transaction: t }
        ),
      ])
    })
  }
};
