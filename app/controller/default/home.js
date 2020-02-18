'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    // ctx.body = await this.service.default.home.index()
    ctx.body = "heloooooooow~"

  }
  async getArticleList() {
    const { ctx } = this;
    const params = ctx.request.body
    console.log(ctx.request.body);

    ctx.body = await this.service.default.home.searchArticle(params)
  }

  async getArticleById() {

    // console.log(id);

    const { ctx } = this;
    let body = ctx.request.body
    // console.log("------------------" + body.id);
    // ctx.body = body
    ctx.body = await this.service.default.home.getArticleById(body)
  }

  //得到类别名称和编号
  async getTypeInfo() {
    const result = await this.service.default.home.getTypeInfo()
    this.ctx.body = { data: result }
  }

  // async getListById() {
  //   const { ctx } = this;
  //   let id = this.ctx.params.id
  //   ctx.body = await this.service.default.home.getListById(id)
  // }

  async searchArticle() {
    const { ctx } = this
    const param = ctx.request.body
    ctx.body = await this.service.default.home.searchArticle(param)

  }

  async getMyComment() {
    const { ctx } = this
    const param = ctx.request.body
    ctx.body = await this.service.default.home.getMyComment(param)
  }

  async getArticleType() {
    const { ctx } = this
    ctx.body = await this.service.default.home.getArticleType()

  }

  async getComments() {
    const { ctx } = this
    ctx.body = await this.service.default.home.queryComment(ctx.request.body)

  }
  async getToComments() {
    const { ctx } = this
    ctx.body = await this.service.default.home.queryToComments(ctx.request.body)

  }
  async initFavArticle() {
    const { ctx } = this
    ctx.body = await this.service.default.home.initFavArticle(ctx.request.body)

  }
  async getFavArticle() {
    const { ctx } = this
    ctx.body = await this.service.default.home.getFavArticle(ctx.request.body)

  }

}

module.exports = HomeController;
