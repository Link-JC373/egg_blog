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
        created_at: DATE,
        updated_at: DATE,

    });
    CommentsToComments.associate = function () {

        app.model.CommentsToComments.belongsTo(app.model.Comments, {
            foreignKey: 'comment_id',
            targetKey: 'comment_id'
        })
        // app.model.CommentsToComments.has
        app.model.CommentsToComments.hasOne(app.model.User, { foreignKey: 'id', sourceKey: 'user_id' })

    }

    return CommentsToComments;
};