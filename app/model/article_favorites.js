'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const ArticleFavorites = app.model.define('articles_favorites', {
        af_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        fav_id: INTEGER,
        user_id: INTEGER,
        article_id: INTEGER,
        createdAt: DATE,
        updatedAt: DATE,
    });
    ArticleFavorites.associate = function () {


        app.model.ArticleFavorites.hasOne(app.model.BlogArticle, { foreignKey: 'id', sourceKey: 'article_id' })


        app.model.ArticleFavorites.belongsTo(app.model.UserFavorites, {
            foreignKey: 'fav_id',
            targetKey: 'fav_id'
        })


    }

    return ArticleFavorites;
};