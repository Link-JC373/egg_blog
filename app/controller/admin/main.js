'use strict'
const { signToken } = require('../../utils/handle_token')

const Controller = require('egg').Controller
const JWT = require('jsonwebtoken')
const loginRule = {
    userName: 'string',
    password: 'string',
    // pa: 'string'
}


class MainController extends Controller {
    async index() {
        this.ctx.body = 'hi api'
    }
    async checkLogin() {
        const { ctx } = this;
        let params = ctx.request.body


        try {
            ctx.validate(loginRule, params)
        } catch (error) {
            ctx.body = { status: 400, message: error }
            return
        }
        const res = await this.service.admin.main.checkLogin(params)

        if (res.data) {
            let signData = signToken(params, this.config.jwt.secret)
            // console.log(signData.token);
            // console.log(signData.userName);

            await this.service.admin.main.saveToken(signData.token, res.data.admin_id)
            console.log(res.data);

            ctx.body = {
                data: {
                    userId: res.data.admin_id,
                    userName: res.data.admin_name,
                },
                ...signData
            }
        }
        else {
            ctx.body = { status: 101, data: { message: '用户名或密码错误' } }

        }


    }

    async getPieData() {
        const { ctx } = this;
        let params = ctx.request.body
        // ctx.body = await this.service.admin.main.getArticleByTimeBetween('2020-1', '2020-2')
        ctx.body = await this.service.admin.main.getPieData()

    }

    async getHistogram() {
        const { ctx } = this;
        let { times } = ctx.request.body
        let result = []
        for (const time of times) {
            let obj = await this.service.admin.main.getArticleByTimeBetween(time[0], time[1])
            result.push(obj)
        }
        ctx.body = { data: result }
    }

    async queryUser() {
        const { ctx } = this;
        let params = ctx.request.body
        ctx.body = await this.service.admin.main.getUser(params)
    }

    async queryComment() {
        const { ctx } = this;
        let { types = 1, ...params } = ctx.request.body;
        if (types === 1) {
            ctx.body = await this.service.admin.main.queryComment(params);
        } else {
            ctx.body = await this.service.admin.main.querySubComment(params)
        }
    }

    async queryArticle() {
        const { ctx } = this;
        let params = ctx.request.body;
        ctx.body = await this.service.default.home.searchArticle(params);
    }

    async deleteUser() {
        const { ctx } = this;
        let params = ctx.request.body;
        ctx.body = await this.service.admin.main.deleteUserById(params.userId)
        // ctx.body = await this.service.admin.main.getUser(params)
    }
    async deleteArticle() {
        const { ctx } = this;
        let params = ctx.request.body;
        ctx.body = await this.service.admin.main.deleteArticleById(params.articleId)
        // ctx.body = await this.service.admin.main.getUser(params)
    }

}

module.exports = MainController