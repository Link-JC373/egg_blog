'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const UserFavorites = app.model.define('user_favorites', {
        fav_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        user_id: INTEGER,
        fav_name: STRING,
        created_at: DATE,
        updated_at: DATE,
    });
    UserFavorites.associate = function () {
        app.model.UserFavorites.hasMany(app.model.ArticleFavorites, { foreignKey: 'fav_id', sourceKey: 'fav_id' })
        app.model.UserFavorites.hasOne(app.model.User, { foreignKey: 'id', sourceKey: 'user_id' })

        // app.model.User.belongsTo(app.model.Comments, {
        //     foreignKey: 'id',
        //     targetKey: 'user_id'
        // })
        // app.model.User.belongsTo(app.model.BlogArticle, {
        //     foreignKey: 'id',
        //     targetKey: 'userid'
        // })
        // app.model.User.belongsTo(app.model.CommentsToComments, {
        //     foreignKey: 'id',
        //     targetKey: 'user_id'
        // })

    }

    return UserFavorites;
};