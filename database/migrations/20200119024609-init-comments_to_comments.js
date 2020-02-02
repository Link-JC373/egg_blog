'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('comments_to_comments', {
      ctc_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      comment_id: INTEGER,
      article_id: INTEGER,
      user_id: INTEGER,
      comment_content: STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments_to_comments');
  }
};
