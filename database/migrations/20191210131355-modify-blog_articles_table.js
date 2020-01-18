'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('blog_article', 'blog_articles')

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('blog_articles', 'blog_article')

  }
};
