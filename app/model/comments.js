'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
        BOOLEAN,

    } = app.Sequelize;

    const Comments = app.model.define('comments', {
        comment_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        article_id: INTEGER,
        user_id: INTEGER,
        comment_content: STRING,
        like_counts: INTEGER,

        createdAt: DATE,
        updatedAt: DATE,

    });
    Comments.associate = function () {
        app.model.Comments.belongsTo(app.model.User, { foreignKey: 'user_id', sourceKey: 'id' })
        app.model.Comments.hasMany(app.model.CommentLikes, { foreignKey: 'comment_id', sourceKey: 'comment_id' })
        app.model.Comments.hasMany(app.model.CommentsToComments, { foreignKey: 'comment_id', sourceKey: 'comment_id' })
        app.model.Comments.belongsTo(app.model.BlogArticle, {
            foreignKey: 'article_id',
            targetKey: 'id'
        })
    }

    return Comments;
};