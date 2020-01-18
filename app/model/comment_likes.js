'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
        TEXT
    } = app.Sequelize;

    const CommentLikes = app.model.define('comment_likes', {
        cl_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        comment_id: INTEGER,
        user_id: INTEGER,
        visitor_id: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    });
    CommentLikes.associate = function () {
        app.model.CommentLikes.belongsTo(app.model.Comments, { foreignKey: 'comment_id', targetKey: 'comment_id' })
    }

    // CommentLikes.

    // ArticleLikes.associate = function () {
    //     app.model.BlogArticle.hasOne(app.model.BlogType, { foreignKey: 'id', sourceKey: 'typeid' })

    //     app.model.BlogArticle.belongsTo(app.model.User, {
    //         foreignKey: 'userid',
    //         targetKey: 'id'
    //     })
    // }
    // BlogArticle.associate = function () {

    // }

    return CommentLikes;
};