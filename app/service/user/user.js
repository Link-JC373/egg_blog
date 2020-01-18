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

}

module.exports = UserService