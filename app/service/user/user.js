'use strict';

const Service = require('egg').Service;

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class UserService extends Service {
    async checkLogin(params) {
        const { ctx } = this;
        const result = await ctx.model.User.findOne({
            where: {
                username: params.userName,
                password: params.passWord,
            }
        })

        return { data: result }
    }
    async saveToken(jwt, userId) {
        const { ctx } = this;

        const result = await ctx.model.User.update({ jwt: jwt }, { where: { id: userId } })
        console.log(result + 'saveToken');

        return { data: result }
    }

    async changeInfo(params) {
        const { ctx } = this
        // params = JSON.stringify(parmas)
        await ctx.model.User.update(
            {
                username: params.userName,
                user_icon: params.userIcon,
                disc: params.disc
            },
            {
                where: {
                    id: params.id
                }
            })
        const result = await ctx.model.User.findByPk(
            params.id
            ,
            {
                attributes: ['username', 'disc', 'user_icon', 'id']
            }
        )
        return { data: result }
    }

    async findUser(params) {
        const { ctx, app } = this
        const { userName } = params
        const result = await ctx.model.User.findOne({
            where: {
                username: userName
            }
        })
        console.log(result);

        return result
    }

    async register(params) {
        const { ctx, app } = this
        const { userName, passWord } = params
        const flag = await this.findUser(params)
        console.log(flag);

        if (Boolean(flag)) {
            return { data: { state: '100', message: '用户名已存在' } }
        }

        const res = await ctx.model.User.create({
            username: userName,
            password: passWord,
            user_icon: 'https://mirror-gold-cdn.xitu.io/16cf9de539bc9ae43fb?imageView2/1/w/180/h/180/q/85/interlace/1'
        })
        return { data: { res, state: 200 } }
    }

    //得到评论自己文章的评论
    async getCommented(params) {
        const { ctx, app } = this
        const { userId, pageNum = 1, pageSize = 10 } = params
        const result = await ctx.model.Comments.findAndCountAll({
            include: [
                {
                    model: ctx.model.User,
                    attributes: ['username', 'user_icon', 'id', 'disc']
                },
                {
                    model: ctx.model.BlogArticle,
                    where: {
                        userId: userId
                    },
                    attributes: ['title', 'id']

                }
            ],
            attributes: ['comment_id', 'comment_content', 'like_counts', 'createdAt'],
            order: [['comment_id', 'DESC']],
            // order: [['comment_id', 'DESC']],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * pageSize,
        })
        let totalPages = parseInt(result.count / pageSize)

        if (result.count % pageSize !== 0) {
            totalPages++
        }

        return { data: { ...result, pageNum, totalPages } }
    }

    //得到评论自己评论的评论
    async getSubCommented(params) {
        const { ctx, app } = this
        const { userId, pageNum = 1, pageSize = 10 } = params
        const result = await ctx.model.CommentsToComments.findAndCountAll({
            where: {
                tc_id: userId
            },
            include: [
                {
                    model: ctx.model.User,
                    attributes: ['username', 'user_icon', 'id', 'disc']
                },
                {
                    model: ctx.model.BlogArticle,
                    attributes: ['title']

                },
            ],
            distinct: true,
            attributes: ['article_id', 'comment_content', 'createdAt'],
            order: [['ctc_id', 'DESC']],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * pageSize,
        })

        let totalPages = parseInt(result.count / pageSize)

        if (result.count % pageSize !== 0) {
            totalPages++
        }

        return { data: { ...result, pageNum, totalPages } }

    }

    //得到给自己点赞的人
    async getCommentLiked(params) {
        const { ctx, app } = this
        const { userId, pageNum = 1, pageSize = 10 } = params
        const result = await ctx.model.CommentLikes.findAndCountAll({
            include: [
                {
                    model: ctx.model.Comments,
                    where: {
                        user_id: userId
                    },
                    attributes: ['comment_content']

                },
                {
                    model: ctx.model.User,
                    attributes: ['username', 'user_icon', 'id', 'disc']
                },
            ],
            distinct: true,
            attributes: ['createdAt'],
            order: [['cl_id', 'DESC']],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * pageSize,

        })

        let totalPages = parseInt(result.count / pageSize)

        if (result.count % pageSize !== 0) {
            totalPages++
        }

        return { data: { ...result, pageNum, totalPages } }

    }
}

module.exports = UserService