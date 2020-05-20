module.exports = app => {
    const checktoken = app.middleware.jwt();
    const { controller } = app
    const router = app.router.namespace('/api/user')

    router.post('/checkLogin', controller.user.user.checkLogin)
    router.post('/changeInfo', controller.user.user.changeInfo)
    router.post('/uploadImg', controller.user.user.upload)


    router.post('/addComment', controller.user.articleOptions.addComment)
    router.post('/addToComment', controller.user.articleOptions.addToComment)
    router.post('/addArticlePoint', controller.user.articleOptions.addArticlePoint)
    router.post('/reduceArticlePoint', controller.user.articleOptions.reduceArticlePoint)
    router.post('/changeCommentLikes', controller.user.articleOptions.changeCommentLikes)
    router.post('/addFavorites', controller.user.articleOptions.addFavorites)
    router.post('/getFavorites', controller.user.articleOptions.getFavorites)
    router.post('/favArticle', controller.user.articleOptions.favArticle)
    router.post('/addArticle', controller.user.articleOptions.addArticle)

    router.post('/cancelFav', controller.user.articleOptions.cancelFav)

    //注册
    router.post('/register', controller.user.user.register)

    router.post('/getCommented', controller.user.user.getCommented)
    router.post('/getSubCommented', controller.user.user.getSubCommented)
    router.post('/getCommentLiked', controller.user.user.getCommentLiked)
}