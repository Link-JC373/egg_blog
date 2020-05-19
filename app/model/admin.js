'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const Admin = app.model.define('admins', {
        admin_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        admin_name: STRING(255),
        admin_password: STRING(255),
        createdAt: DATE,
        updatedAt: DATE,
        admin_jwt: STRING(255),
    });

    return Admin;
};