'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('blog_type', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      typename: STRING(255),
      ordernum: INTEGER,
      icon: STRING(255),
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('blog_type');
  },
};
