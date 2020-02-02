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
    async saveToken(jwt, userName) {
        const { ctx } = this;

        const result = await ctx.model.User.update({ jwt: jwt }, { where: { username: userName } })
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

}

module.exports = UserService