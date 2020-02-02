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

        created_at: DATE,
        updated_at: DATE,

    });
    Comments.associate = function () {
        app.model.Comments.hasOne(app.model.User, { foreignKey: 'id', sourceKey: 'user_id' })
        app.model.Comments.hasMany(app.model.CommentLikes, { foreignKey: 'comment_id', sourceKey: 'comment_id' })
        app.model.Comments.hasMany(app.model.CommentsToComments, { foreignKey: 'comment_id', sourceKey: 'comment_id' })
    }

    return Comments;
};