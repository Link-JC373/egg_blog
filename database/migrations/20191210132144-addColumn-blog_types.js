'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('blog_types', 'created_at', {
          type: Sequelize.DATE
        }, { transaction: t }),
        queryInterface.addColumn('blog_types', 'updated_at', {
          type: Sequelize.DATE,
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('blog_types', 'created_at', {
          type: Sequelize.DATE
        }, { transaction: t }),
        queryInterface.removeColumn('blog_types', 'updated_at', {
          type: Sequelize.DATE,
        }, { transaction: t })
      ])
    })
  }
};
