'use strict';
const { addPointRule, addCommentRule } = require('../../utils/validate_rule')
const Controller = require('egg').Controller;
class ArticleInterController extends Controller {

    async addComment() {
        const { ctx } = this
        let params = ctx.request.body
        try {
            ctx.validate(addCommentRule, params)
        } catch (error) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!");
            console.log(error);
            throw ctx.body = { status: 400, message: error }
        }
        ctx.body = await this.service.user.articleOptions.saveComent(params)
    }
    async addArticlePoint() {
        const { ctx } = this
        let params = ctx.request.body

        try {
            ctx.validate(addPointRule, params)
        } catch (error) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!");
            console.log(error);
            throw ctx.body = { status: 400, message: error }
        }
        console.log("------------------");

        ctx.body = await this.service.user.articleOptions.addArticlePoint(params)
    }
    async reduceArticlePoint() {
        const { ctx } = this
        let params = ctx.request.body

        try {
            ctx.validate(addPointRule, params)
        } catch (error) {
            print(error)
            throw ctx.body = { status: 400, message: error }
        }
        console.log("------------------");

        ctx.body = await this.service.user.articleOptions.reduceArticlePoint(params)
    }

}

module.exports = ArticleInterController