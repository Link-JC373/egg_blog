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
        createdAt: DATE,
        updatedAt: DATE,
        jwt: STRING(255),

    });
    User.associate = function () {
        app.model.User.hasMany(app.model.BlogArticle, { foreignKey: 'userid', sourceKey: 'id' })
        app.model.User.hasMany(app.model.CommentsToComments, { foreignKey: 'user_id', sourceKey: 'id' })
        app.model.User.hasMany(app.model.CommentLikes, { foreignKey: 'user_id', sourceKey: 'id' })


        app.model.User.hasMany(app.model.Comments, {
            foreignKey: 'user_id',
            targetKey: 'id'
        })
        app.model.User.belongsTo(app.model.BlogArticle, {
            foreignKey: 'id',
            targetKey: 'userid'
        })
        // app.model.User.belongsTo(app.model.CommentsToComments, {
        //     foreignKey: 'id',
        //     targetKey: 'user_id'
        // })
        app.model.User.belongsTo(app.model.UserFavorites, {
            foreignKey: 'id',
            targetKey: 'user_id'
        })

    }

    return User;
};