'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('blog_article', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      typeid: INTEGER,
      title: STRING(255),
      article_content: TEXT,
      introduce: TEXT,
      created_at: DATE,
      updated_at: DATE,
      view_count: INTEGER
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('blog_article');
  },
};
