'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('blog_articles', 'userId', {
          type: Sequelize.INTEGER
        }, { transaction: t }),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('blog_articles', 'userId', {
        type: Sequelize.INTEGER
      }, { transaction: t }),
    ])
  }
};
