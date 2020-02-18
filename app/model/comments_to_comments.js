'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const CommentsToComments = app.model.define('comments_to_comments', {

        ctc_id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        tc_id: INTEGER,
        tc_name: STRING,
        comment_id: INTEGER,
        article_id: INTEGER,
        user_id: INTEGER,
        comment_content: STRING,
        createdAt: DATE,
        updatedAt: DATE,

    });
    CommentsToComments.associate = function () {

        app.model.CommentsToComments.belongsTo(app.model.Comments, {
            foreignKey: 'comment_id',
            targetKey: 'comment_id'
        })

        // app.model.CommentsToComments.hasOne(app.model.User, {
        //     foreignKey: 'id',
        //     targetKey: 'user_id'
        // })

        app.model.CommentsToComments.belongsTo(app.model.BlogArticle, {
            foreignKey: 'article_id',
            targetKey: 'id'
        })
        // app.model.CommentsToComments.has
        app.model.CommentsToComments.belongsTo(app.model.User, { foreignKey: 'user_id', sourceKey: 'id' })

    }

    return CommentsToComments;
};