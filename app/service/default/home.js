'use strict';

const Service = require('egg').Service;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}
class HomeService extends Service {

    //根据文章id获取文章
    async getArticleById(params) {
        const { ctx, app } = this
        const { articleId, userId = 0 } = params
        let isLike = false //是否点赞，默认没点赞
        let result = await ctx.model.BlogArticle.findByPk(toInt(articleId));
        const alResult = await ctx.model.ArticleLikes.findOne({
            where: {
                [Op.and]: [
                    {
                        user_id: toInt(userId),
                    }, {
                        article_id: toInt(articleId)
                    }
                ]
            },
        })


        let likeCount = await app.redis.hget('article', articleId)
        //将 likeCount 转为数字类型
        likeCount = +likeCount
        console.log(alResult);

        if (alResult) {
            isLike = true
        }

        result ?
            result = {
                ...result.dataValues,
                isLike,
                likeCount,
            } :
            {}
        // console.log(alResult);
        return { data: result }
    }

    //搜索
    async searchArticle(params) {
        // console.log(searchContent + '============================');
        const { searchContent, pageNum = 0, pageSize = 10, articleTypeId } = params
        let searchParams = []
        let typeParams = []
        console.log(searchContent);
        if (searchContent) {
            searchParams.push({
                title: {
                    [Op.like]: `%${searchContent}%`
                }
            })
        }
        if (articleTypeId) {
            typeParams.push({
                id: articleTypeId
            })
        }


        const { ctx } = this
        const result = await ctx.model.BlogArticle.findAndCountAll({
            where: {
                [Op.and]: searchParams
            },
            attributes: ['id', 'title'],
            include: [
                {
                    where: {
                        [Op.and]: typeParams

                    },

                    model: ctx.model.BlogType,

                    attributes: ['typename']
                },
                {
                    model: ctx.model.User,
                    attributes: ['username']
                }
            ],
            order: [['id']],
            limit: toInt(pageSize),
            offset: toInt(pageNum) * 10,
        })
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
        return { data: result }
    }

    async getArticleByType() {
        const { ctx } = this
        const result = await ctx.model.BlogType.findAll({
            attributes: ['typename']
        })
        console.log(result);

        return { data: result }
    }

}

module.exports = HomeService;
