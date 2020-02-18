'use strict';

const Service = require('egg').Service;

const Sequelize = require('sequelize');
const Async = require('async')
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
        let isFav = false //是否收藏，默认未收藏
        let result = await ctx.model.BlogArticle.findOne({
            where: {
                id: toInt(articleId),
            },
            include: {
                model: ctx.model.User,
                attributes: ['username', 'user_icon', 'id', 'disc']
            },
        });

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

        //查找是否收藏了文章
        const favResult = await ctx.model.ArticleFavorites.findOne({
            where: {
                user_id: toInt(userId),
                article_id: toInt(articleId)
            }
        })
        console.log(favResult);



        let likeCount = await app.redis.hget('article', articleId)
        //将 likeCount 转为数字类型
        likeCount = +likeCount
        // console.log(alResult);

        if (alResult) {
            isLike = true
        }
        if (favResult) {
            isFav = true
        }

        result ?
            result = {
                ...result.dataValues,
                isLike,
                isFav,
                likeCount,
            } :
            {}
        // console.log(alResult);
        return { data: result }
    }

    //搜索
    async searchArticle(params) {
        // console.log(searchContent + '============================');
        const { searchContent, pageNum = 1, pageSize = 5, articleTypeId, userId } = params
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
        if (userId) {
            searchParams.push({
                userid: userId
            })
        }
        if (articleTypeId) {
            typeParams.push({
                id: articleTypeId
            })
        }


        const { ctx, app } = this
        let result = await ctx.model.BlogArticle.findAndCountAll({
            where: {
                [Op.and]: searchParams
            },
            // attributes: ['id', 'title', 'introduce'],
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
                    attributes: ['username', 'id', 'user_icon', 'disc']
                },
                {
                    model: ctx.model.Comments,
                    attributes: ['comment_id']
                },
                {
                    model: ctx.model.CommentsToComments,
                    attributes: ['ctc_id']
                }
            ],
            order: [['id', 'DESC']],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * 5,
        })

        for (let i = 0; i < result.rows.length; i++) {

            result.rows[i].dataValues.likeCount = await app.redis.hget('article', result.rows[i].dataValues.id)
            result.rows[i].dataValues.likeCount = +result.rows[i].dataValues.likeCount

        }



        let total_pages = parseInt(result.count / 5)

        if (result.count % 5 !== 0) {
            total_pages++
        }

        return {
            data: { ...result, total_pages, pageNum }
        }
    }



    async getMyComment(params) {
        const { ctx, app } = this
        const { userId, pageNum = 1, pageSize = 5 } = params
        const commentRes = await ctx.model.Comments.findAndCountAll({
            where: {
                user_id: userId
            },
            include: [{

                model: ctx.model.User,
                attributes: ['username', 'user_icon', 'id', 'disc']
            },
            {

                model: ctx.model.BlogArticle,
                attributes: ['id', 'introduce', 'title']
            },
            ],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * 5,
        })
        const ctcRes = await ctx.model.CommentsToComments.findAndCountAll({
            where: {
                user_id: userId
            },
            include: [{

                model: ctx.model.User,
                attributes: ['username', 'user_icon', 'id', 'disc']
            },
            {

                model: ctx.model.BlogArticle,
                attributes: ['id', 'introduce', 'title']
            },],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * 5,
        })

        let totalPages;
        if (commentRes.count > ctcRes.count) {
            totalPages = parseInt(commentRes.count / 5)

            if (commentRes.count % 5 !== 0) {
                totalPages++
            }
        } else {
            totalPages = parseInt(ctcRes.count / 5)

            if (ctcRes.count % 5 !== 0) {
                totalPages++
            }
        }


        const result = { commentRes, ctcRes, pageNum, totalPages };
        return { data: result }
    }


    async queryComment(params) {
        const { ctx, app } = this;
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
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * 5,
        })
        //拿到点赞的评论id
        // let likesRow = await ctx.model.Comments.findAndCountAll({
        //     where: {
        //         article_id: articleId,
        //     },
        //     include: [
        //         {
        //             model: ctx.model.CommentLikes,
        //             where: {
        //                 visitor_id: userId
        //             }
        //         }
        //     ],
        //     order: [['comment_id']],
        //     limit: toInt(pageSize),
        //     offset: toInt(pageNum - 1) * 5,
        // })

        // let likedList = []
        // if (likesRow.rows.length > 0) {
        //     likesRow.rows.map((item, index) => {
        //         likedList.push(item.comment_id)
        //     })
        // }

        let total_pages = parseInt(result.count / 5)

        if (result.count % 5 !== 0) {
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

    async queryToComments(params) {
        const { ctx } = this
        const { commentId } = params

        const result = await ctx.model.CommentsToComments.findAll({
            where: {
                comment_id: commentId,
            },
            include: {
                model: ctx.model.User,
                attributes: ['username', 'user_icon', 'id', 'disc'],

            },
            order: [['ctc_id', 'DESC']]
        })
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

    async initFavArticle(params) {
        const { ctx } = this
        const { userId, favId } = params
        console.log(params);

        const user = await ctx.model.User.findByPk(userId
            ,
            {
                attributes: ['username', 'disc', 'user_icon', 'id']
            })
        let userFav = await ctx.model.UserFavorites.findOne({
            where: {
                fav_id: favId
            },
            attributes: ['fav_name', 'updatedAt']
        })

        let result = await this.getFavArticle({ favId: favId })
        result.data = {
            ...result.data,
            fav_name: userFav.fav_name,
            updatedAt: userFav.updatedAt,
        }
        return { data: { user, ...result } }
    }

    async getFavArticle(params) {
        const { ctx } = this
        const { favId, pageNum = 1, pageSize = 10 } = params
        console.log(favId);

        let result = await ctx.model.ArticleFavorites.findAndCountAll({
            where: {
                fav_id: favId
            },
            include: [
                {
                    model: ctx.model.BlogArticle,
                    attributes: ['id', 'title', 'createdAt'],
                    include: {
                        model: ctx.model.User,
                        attributes: ['username', 'disc', 'user_icon', 'id']
                    }
                },
            ],
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



}

module.exports = HomeService;
