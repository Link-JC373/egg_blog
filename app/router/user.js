
module.exports = app => {
    const checktoken = app.middleware.jwt();
    const { router, controller } = app
    router.post('/user/checkLogin', controller.user.user.checkLogin)
    router.post('/user/changeInfo', controller.user.user.changeInfo)
    router.post('/default/uploadImg', controller.user.user.upload)


    router.post('/user/addComment', controller.user.articleOptions.addComment)
    router.post('/user/addToComment', controller.user.articleOptions.addToComment)
    router.post('/user/addArticlePoint', controller.user.articleOptions.addArticlePoint)
    router.post('/user/reduceArticlePoint', controller.user.articleOptions.reduceArticlePoint)
    router.post('/user/changeCommentLikes', controller.user.articleOptions.changeCommentLikes)
    router.post('/user/addFavorites', controller.user.articleOptions.addFavorites)
    router.post('/user/getFavorites', controller.user.articleOptions.getFavorites)
    router.post('/user/favArticle', controller.user.articleOptions.favArticle)
    router.post('/user/addArticle', controller.user.articleOptions.addArticle)

    router.post('/user/cancelFav', controller.user.articleOptions.cancelFav)
    router.post('/user/register', controller.user.user.register)
    router.post('/user/getCommented', controller.user.user.getCommented)
    router.post('/user/getSubCommented', controller.user.user.getSubCommented)
    router.post('/user/getCommentLiked', controller.user.user.getCommentLiked)
}