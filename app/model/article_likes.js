'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
        TEXT
    } = app.Sequelize;

    const ArticleLikes = app.model.define('article_likes', {
        al_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        article_id: INTEGER,
        user_id: INTEGER,
        created_at: DATE,
        updated_at: DATE,


    });

    // ArticleLikes.associate = function () {
    //     app.model.BlogArticle.hasOne(app.model.BlogType, { foreignKey: 'id', sourceKey: 'typeid' })

    //     app.model.BlogArticle.belongsTo(app.model.User, {
    //         foreignKey: 'userid',
    //         targetKey: 'id'
    //     })
    // }
    // BlogArticle.associate = function () {

    // }

    return ArticleLikes;
};