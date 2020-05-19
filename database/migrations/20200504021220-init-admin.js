'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('admins', {
      // af_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      admin_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      admin_name: STRING,
      admin_password: STRING,
      admin_jwt: STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admins');

  }
};
