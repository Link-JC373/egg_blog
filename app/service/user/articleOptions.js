'use strict';
const Service = require('egg').Service;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

    async addToComment(params) {
        const { ctx } = this;
        const { userId, commentContent, tcId, tcName, commentId, articleId } = params
        const result = await ctx.model.CommentsToComments.create({
            user_id: userId,
            comment_content: commentContent,
            tc_id: tcId,
            article_id: articleId,
            tc_name: tcName,
            comment_id: commentId,
        })
        return { data: result }
    }
    async changeCommentLikes(params) {
        const { ctx } = this;
        const { commentId, flag, userId } = params
        let result;
        if (flag) {
            result = await ctx.model.CommentLikes.destroy({
                where: {
                    user_id: userId,
                    comment_id: commentId
                }
            })

        } else {
            result = await ctx.model.CommentLikes.create({
                user_id: userId,
                comment_id: commentId,

            })
        }

        return { data: result }
    }


    async queryComment(params) {
        const { ctx } = this;
        const { articleId, pageNum = 1, pageSize = 10, userId = 0 } = params
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
                },
                {
                    model: ctx.model.CommentsToComments,
                    attributes: ['ctc_id', 'tc_id', 'tc_name', 'comment_content', 'createdAt'],

                    order: [['ctc_id', 'DESC']],
                    include: {
                        model: ctx.model.User,
                        attributes: ['username', 'user_icon', 'id', 'disc'],

                    }
                },
                {
                    model: ctx.model.CommentLikes,
                    attributes: ['user_id'],

                }
            ],
            order: [['comment_id']],
            // order: [['comment_id', 'DESC']],
            distinct: true,
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * pageSize,
        })

        let total_pages = parseInt(result.count / pageSize)

        if (result.count % pageSize !== 0) {
            total_pages++
        }
        result = {
            ...result,
            total_pages,
            pageNum,
            // likedList
        }
        return { data: result }
    }



    //文章点赞
    async addArticlePoint(params) {
        const { ctx, app } = this;
        const { articleId, userId } = params

        const value = await app.redis.hget('article', articleId)

        await app.redis.hset('article', articleId, parseInt(value) + 1)
        // await app.redis.hget('article', articleId)
        const result = await app.model.ArticleLikes.create({ user_id: userId, article_id: articleId })

        return { data: result }

    }

    //取消文章点赞
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

    //增加收藏夹
    async addFavorites(params) {
        const { ctx, app } = this;
        const { userId, favName } = params

        await app.model.UserFavorites.create({

            user_id: userId,
            fav_name: favName

        })

        const result = await this.getFavorites(params)
        return { data: result }
    }

    //得到收藏夹
    async getFavorites(params) {
        const { ctx, app } = this;
        const { userId, articleId } = params


        let result = await app.model.UserFavorites.findAll({
            where: {
                user_id: userId
            },
            include: {
                model: ctx.model.ArticleFavorites,

            },
            distinct: true,
            attributes: ['fav_id', 'fav_name', 'user_id', 'createdAt']
        })

        for (let i = 0; i < result.length; i++) {
            let isFav = false
            result[i].articles_favorites.map((item, index) => {
                if (item.article_id === articleId) {

                    isFav = true
                }
            })

            result[i].dataValues.isFav = isFav
        }
        // console.log(result);



        // const favCount = result.articles_favorites
        return { data: result }
    }


    //取消收藏
    async cancelFav(params) {
        const { ctx, app } = this
        const { userId, articleId, favId } = params
        let result = await app.model.ArticleFavorites.destroy({
            where: {
                article_Id: articleId,
                user_id: userId,
                fav_id: favId
            }
        })
        const favResult = await ctx.model.ArticleFavorites.findOne({
            where: {
                user_id: toInt(userId),
                article_id: toInt(articleId)
            }
        })
        console.log(favResult);

        let isFav = true
        if (!favResult) {
            isFav = false
        }

        result = {
            ...result.dataValues,
            isFav
        }

        return { data: result }
    }

    //收藏文章
    async favArticle(params) {
        const { ctx, app } = this
        const { userId, articleId, favId } = params
        const result = await app.model.ArticleFavorites.create({

            article_id: articleId,
            user_id: userId,
            fav_id: favId

        })

        return { data: result }
    }

    //发表文章
    async addArticle(params) {
        const { ctx, app } = this
        const { userId, title, articleContent, typeid, introduce } = params
        const result = await app.model.BlogArticle.create({
            title: title,
            userid: userId,
            article_content: articleContent,
            introduce: introduce,
            typeid: typeid
        })
        await app.redis.hset('article', result.id, 0)
        const userInfo = await app.model.User.findByPk(userId,
            {
                attributes: ['article_count']
            }
        )
        //userInfo.article_count + 1
        await app.model.User.update({ article_count: userInfo.article_count + 1 }, { where: { id: userId } })
        console.log(userInfo);

        return { data: { status: 200, userInfo } }
    }
}

module.exports = ArticleInterService