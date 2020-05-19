'use strict'

const Controller = require('egg').Controller;
const { loginRule, userInfoRule } = require('../../utils/validate_rule')
const { signToken } = require('../../utils/handle_token')
const path = require('path')
// const { validateLogin } = require('../../utils/validators')
const fs = require('fs')
const sendToWormhole = require('stream-wormhole');
class UserController extends Controller {
    async checkLogin() {
        const { ctx } = this;
        let params = ctx.request.body


        try {
            ctx.validate(loginRule, params)
        } catch (error) {
            ctx.body = { status: 400, message: error }
            return
        }
        const res = await this.service.user.user.checkLogin(params)

        if (res.data) {
            let signData = signToken(res, this.config.jwt.secret)
            // console.log(signData.token);
            // console.log(signData.userName);

            await this.service.user.user.saveToken(signData.token, res.data.id)
            console.log(res.data);

            ctx.body = {
                'status': 200,
                'data': {
                    userId: res.data.id,
                    userName: res.data.username,
                    userIcon: res.data.user_icon,
                    disc: res.data.disc
                },
                ...signData
            }
        }
        else {
            //这里为啥会是403，我吐了，我当时在想啥？
            ctx.body = { 'status': 403, 'message': '用户名或密码错误' }
        }


    }

    async upload() {
        const { ctx } = this

        let stream = await ctx.getFileStream()
        let filename = new Date().getTime() + stream.filename

        let target = path.join('./', `uploadfile/${filename}`)
        // console.log(target)

        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await stream.pipe(writeStream)

        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            ctx.body = { status: 400, message: `上传文件出错 ${err}` }
            throw err;
        }
        ctx.body = { status: 200, data: { url: '/uploadFile/' + filename } }
    }

    async changeInfo() {
        const { ctx } = this
        let params = ctx.request.body
        console.log(params);

        try {
            ctx.validate(userInfoRule, params)
        } catch (error) {
            ctx.body = { status: 400, message: error }
            return
        }
        const res = await this.service.user.user.changeInfo(params)

        ctx.body = {
            'status': 200,
            'data': {
                userId: res.data.id,
                userName: res.data.username,
                userIcon: res.data.user_icon,
                disc: res.data.disc
            },
        }

        // ctx.body = { status: 200, ...result }
    }

    async register() {
        const { ctx } = this;
        ctx.body = await this.service.user.user.register(ctx.request.body)
    }

    async getCommented() {
        const { ctx } = this
        ctx.body = await this.service.user.user.getCommented(ctx.request.body)
    }
    async getSubCommented() {
        const { ctx } = this
        ctx.body = await this.service.user.user.getSubCommented(ctx.request.body)
    }
    async getCommentLiked() {
        const { ctx } = this
        ctx.body = await this.service.user.user.getCommentLiked(ctx.request.body)
    }
}

module.exports = UserController