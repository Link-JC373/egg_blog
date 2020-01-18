'use strict'

const Service = require('egg').Service

class MainService extends Service {

    async checkLogin(params) {
        let userName = params.userName
        let password = params.password
        const sql = "select userName from admin_user where userName = '" + userName + "'AND password = '" + password + "'"
        return await this.app.mysql.query(sql)

    }
}
module.exports = MainService
