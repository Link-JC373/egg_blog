'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
        TEXT
    } = app.Sequelize;

    const BlogArticle = app.model.define('blog_articles', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        typeid: INTEGER,
        title: STRING(255),
        userid: INTEGER,
        article_content: TEXT,
        introduce: TEXT,
        created_at: DATE,
        updated_at: DATE,
        view_count: INTEGER

    });

    BlogArticle.associate = function () {
        app.model.BlogArticle.hasOne(app.model.BlogType, { foreignKey: 'id', sourceKey: 'typeid' })

        app.model.BlogArticle.belongsTo(app.model.User, {
            foreignKey: 'userid',
            targetKey: 'id'
        })
    }
    // BlogArticle.associate = function () {

    // }

    return BlogArticle;
};