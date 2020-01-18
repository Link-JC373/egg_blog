'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('comments', 'likeCounts', {
          type: Sequelize.INTEGER
        },
          { transaction: t }
        ),
        queryInterface.addColumn('comments', 'isLiked', {
          type: Sequelize.BOOLEAN
        },
          { transaction: t }
        ),

      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('comments', 'likeCounts', {
          type: Sequelize.INTEGER
        },
          { transaction: t }
        ),
        queryInterface.removeColumn('comments', 'isLiked', {
          type: Sequelize.BOOLEAN
        },
          { transaction: t }
        ),

      ])
    })
  }
};
