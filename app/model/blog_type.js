'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER,
        DATE,
    } = app.Sequelize;

    const BlogType = app.model.define('blog_types', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        typename: STRING(255),
        ordernum: INTEGER,
        icon: STRING(255),
        created_at: DATE,
        updated_at: DATE,

    });
    BlogType.associate = function () {
        app.model.BlogType.belongsTo(app.model.BlogArticle, { foreignKey: 'id', targetKey: 'typeid' })
    }

    return BlogType;
};