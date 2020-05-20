module.exports = app => {
    const { controller } = app
    const router = app.router.namespace('/api/default')
    router.get('/index', controller.default.home.index)
    router.post('/getArticleList', controller.default.home.getArticleList)
    router.post('/getArticleById', controller.default.home.getArticleById)
    router.get('/getTypeInfo', controller.default.home.getTypeInfo)
    router.post('/getMyComment', controller.default.home.getMyComment)     //app查询用户评论
    router.post('/getUserComments', controller.default.home.getUserComment) //web端的查询用户评论
    // router.get('/default/getListById/:id', controller.default.home.getListById)
    router.post('/searchSomeThing', controller.default.home.searchArticle)
    router.post('/getArticleType', controller.default.home.getArticleType)
    router.post('/getComments', controller.default.home.getComments)
    router.post('/getToComments', controller.default.home.getToComments)
    router.post('/initFavArticle', controller.default.home.initFavArticle)
    router.post('/getFavArticle', controller.default.home.getFavArticle)
    router.get('/getRanking', controller.default.home.getRanking)

    //拿到所有收藏夹
    router.post('/getFavorites', controller.default.home.getFavorites)

    //根据id找用户
    router.get('/findUserById/:userId', controller.default.home.findUserById)
}