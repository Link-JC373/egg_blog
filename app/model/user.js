'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const User = app.model.define('users', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: STRING(255),
        password: STRING(255),
        email: STRING(255),
        user_icon: STRING(255),
        disc: STRING(255),
        created_at: DATE,
        updated_at: DATE,
        jwt: STRING(255),

    });
    User.associate = function () {
        app.model.User.hasMany(app.model.BlogArticle, { foreignKey: 'userid', sourceKey: 'id' })
        app.model.User.belongsTo(app.model.Comments, {
            foreignKey: 'id',
            targetKey: 'user_id'
        })
    }

    return User;
};