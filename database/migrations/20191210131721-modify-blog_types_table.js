'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('blog_type', 'blog_types')

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('blog_types', 'blog_type')

  }
};
