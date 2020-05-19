'use strict'

const Service = require('egg').Service
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}
class MainService extends Service {

    async checkLogin(params) {
        const { ctx } = this;
        const result = await ctx.model.Admin.findOne({
            where: {
                admin_name: params.userName,
                admin_password: params.password,
            }
        })

        return { data: result }
    }
    async saveToken(jwt, userId) {
        const { ctx } = this;

        const result = await ctx.model.Admin.update({ admin_jwt: jwt }, { where: { admin_id: userId } })
        console.log(result + 'saveToken');

        return { data: result }
    }

    async getPieData() {
        const { ctx } = this;
        let all = await ctx.model.BlogArticle.findAll({
            attributes: ['id']
        })
        const develop = await ctx.model.BlogArticle.findAndCountAll({
            where: { typeid: 1 },
            attributes: ['id']
        })
        const operation = await ctx.model.BlogArticle.findAndCountAll({
            where: { typeid: 2 },
            attributes: ['id']
        })
        const evaluation = await ctx.model.BlogArticle.findAndCountAll({
            where: { typeid: 3 },
            attributes: ['id']
        })
        all = all.length
        const developData = {
            item: '游戏开发',
            count: develop.count,
            percent: Number((develop.count / all).toFixed(2)),
        }
        const operationData = {
            item: '游戏运维',

            count: operation.count,
            percent: Number((operation.count / all).toFixed(2)),
        }
        const evaluationData = {
            item: '游戏测评',
            count: evaluation.count,
            percent: Number((evaluation.count / all).toFixed(2)),
        }
        return { data: [developData, operationData, evaluationData] }

    }

    async getArticleByTimeBetween(start, end) {
        const { ctx } = this;
        const result = await ctx.model.BlogArticle.findAll({
            where: {
                createdAt: {
                    [Op.between]: [start, end]
                }
            },
            attributes: ['id']
        })
        return { time: start, sales: result.length }
    }

    async getUser(params) {
        const { ctx } = this;
        const { userId, userName, pageNum = 1, pageSize = 5 } = params

        let searchParams = []

        if (userId) {
            searchParams.push({
                id: userId
            })
        }

        if (userName) {
            searchParams.push({
                username: {
                    [Op.like]: `%${userName}%`
                }
            })
        }

        const result = await ctx.model.User.findAndCountAll({
            where: {
                [Op.and]: searchParams
            },
            attributes: ['id', 'username', 'disc'],
            order: [['id']],
            limit: toInt(pageSize),
            offset: toInt(pageNum - 1) * pageSize,
        })
        return {
            data: {
                ...result,
                totalPages: Math.ceil(result.count / pageSize)
            }
        }
    }

    async deleteUserById(userId) {
        const { ctx } = this;
        const result = await ctx.model.User.destroy({
            where: {
                id: userId
            }
        })
        return result
    }
    async deleteArticleById(articleId) {
        const { ctx } = this;
        const result = await ctx.model.BlogArticle.destroy({
            where: {
                id: articleId
            }
        })
        return result
    }

    async queryComment(params) {
        const { ctx } = this;
        const { pageNum = 1, pageSize = 5 } = params;
        let searchParams = [];
        const commentRes = await ctx.model.Comments.findAndCountAll({
            where: {
                [Op.and]: searchParams
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
            offset: toInt(pageNum - 1) * pageSize,
        })



        const result = { ...commentRes, pageNum, totalPages: Math.ceil(commentRes.count / pageSize) };
        return { data: result }
    }

    async querySubComment(params) {
        const { ctx } = this;
        const { pageNum = 1, pageSize = 5 } = params
        let searchParams = []
        const ctcRes = await ctx.model.CommentsToComments.findAndCountAll({
            where: {
                [Op.and]: searchParams
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
            offset: toInt(pageNum - 1) * pageSize,
        })
        const result = { ctcRes, pageNum, totalPages: ctcRes.count };
        return { data: result }

    }

}
module.exports = MainService
