'use strict';
const Service = require('egg').Service;

const Sequelize = require('sequelize');
function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}
class ArticleInterService extends Service {

    async saveComent(params) {
        const { ctx } = this;
        const { userId, commentContent, articleId, } = params
        await ctx.model.Comments.create({ article_id: articleId, comment_content: commentContent, user_id: userId })

        const result = await this.queryComment(params)
        return { data: result }
    }

    async queryComment(params) {
        const { ctx } = this;
        const { articleId, pageNum = 1, pageSize = 5, userId = 0 } = params
        //拿到所有评论
        let result = await ctx.model.Comments.findAndCountAll({
            where: {
                article_id: articleId,
            },
            include: [
                {
                    model: ctx.model.User,
                    attributes: ['username', 'user_icon', 'id', 'disc']

                    // attributes: ['username']
                }
            ],
            order: [['comment_id', 'DESC']],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * 5,
        })
        //拿到点赞的评论id
        let likesRow = await ctx.model.Comments.findAndCountAll({
            where: {
                article_id: articleId,
            },
            include: [
                {
                    model: ctx.model.CommentLikes,
                    where: {
                        visitor_id: userId
                    }
                }
            ],
            order: [['comment_id']],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * 5,
        })

        let likedList = []
        if (likesRow.rows.length > 0) {
            likesRow.rows.map((item, index) => {
                likedList.push(item.comment_id)
            })
        }

        let total_pages = parseInt(result.count / 5)

        if (result.count % 5 !== 0) {
            total_pages++
        }
        result = {
            ...result,
            total_pages,
            pageNum,
            likedList
        }
        return result
    }



    async addArticlePoint(params) {
        const { ctx, app } = this;
        const { articleId, userId } = params

        const value = await app.redis.hget('article', articleId)

        await app.redis.hset('article', articleId, parseInt(value) + 1)
        // await app.redis.hget('article', articleId)
        const result = await app.model.ArticleLikes.create({ user_id: userId, article_id: articleId })

        return { data: result }

    }
    async reduceArticlePoint(params) {
        const { ctx, app } = this;
        const { articleId, userId } = params

        const result = await app.model.ArticleLikes.destroy(
            {
                where: { user_id: userId, article_id: articleId }
            }
        )

        const value = await app.redis.hget('article', articleId)
        await app.redis.hset('article', articleId, parseInt(value) - 1)
        // await app.redis.hget('article', articleId)


        return { data: result }

    }
}

module.exports = ArticleInterService