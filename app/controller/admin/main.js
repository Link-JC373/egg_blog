'use strict'

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
        let params = {
            userName: '',
            password: '',
        }
        console.log(this.ctx.request.body);
        try {
            this.ctx.validate(loginRule, this.ctx.request.body)

        } catch (error) {
            // this.ctx.status = 403
            this.ctx.body = { 'status': 403, 'message': '输入的数据不符合要求' }
            return
            // return this.ctx.throw(403, { 'status': 403, 'message': '输入的数据不符合要求' })

        }
        params = this.ctx.request.body
        const res = await this.service.admin.main.checkLogin(params)
        // console.log(res[0].userName);

        if (res.length > 0) {
            const token = JWT.sign(
                {
                    userName: res[0].userName,
                },
                this.config.jwt.secret,
                {
                    expiresIn: 60 * 60
                }
            )

            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'status': 200, 'data': '登录成功', 'openId': openId, token }
        } else {
            this.ctx.body = { 'status': 403, 'message': '用户名或密码错误' }
        }
    }
    async test() {
        this.ctx.body = 'Nice afei!'
    }
}

module.exports = MainController