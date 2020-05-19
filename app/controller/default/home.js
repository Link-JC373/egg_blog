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

  //查询用户的评论
  async getMyComment() {
    const { ctx } = this
    const param = ctx.request.body
    ctx.body = await this.service.default.home.getMyComment(param)
  }

  async getUserComment() {
    const { ctx } = this
    const param = ctx.request.body
    let comments = await this.service.default.home.getMyComment(param)
    console.log(comments.data.commentRes.count + comments.data.ctcRes.count);

    let res = {
      data: {
        total_pages: comments.data.totalPages,
        pageNum: comments.data.pageNum,
        rows: [...comments.data.commentRes.rows, ...comments.data.ctcRes.rows],
        count: comments.data.commentRes.count + comments.data.ctcRes.count
      }
    }
    ctx.body = res
  }

  async getArticleType() {
    const { ctx } = this
    ctx.body = await this.service.default.home.getArticleType()
  }



  //查询文章下的评论
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

  //拿到所有收藏夹
  async getFavorites() {
    const { ctx } = this
    let params = ctx.request.body
    let fav = await this.service.user.articleOptions.getFavorites(params)
    let result = {
      data: {
        count: fav.data.length,
        rows: fav.data,
        pageNum: 1,
        total_pages: 1
      }
    }
    ctx.body = result
  }

  async getRanking() {
    const { ctx } = this
    ctx.body = await this.service.default.home.getRanking()
  }

  async findUserById() {
    const { ctx } = this
    // let params = ctx.request.body
    ctx.body = await this.service.default.home.findUserById(ctx.params)
  }

}

module.exports = HomeController;
