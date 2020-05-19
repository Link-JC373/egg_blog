module.exports = app => {
    const { router, controller } = app
    router.get('/default/index', controller.default.home.index)
    router.post('/default/getArticleList', controller.default.home.getArticleList)
    router.post('/default/getArticleById', controller.default.home.getArticleById)
    router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
    router.post('/default/getMyComment', controller.default.home.getMyComment)     //app查询用户评论
    router.post('/default/getUserComments', controller.default.home.getUserComment) //web端的查询用户评论
    // router.get('/default/getListById/:id', controller.default.home.getListById)
    router.post('/default/searchSomeThing', controller.default.home.searchArticle)
    router.post('/default/getArticleType', controller.default.home.getArticleType)
    router.post('/default/getComments', controller.default.home.getComments)
    router.post('/default/getToComments', controller.default.home.getToComments)
    router.post('/default/initFavArticle', controller.default.home.initFavArticle)
    router.post('/default/getFavArticle', controller.default.home.getFavArticle)
    router.get('/default/getRanking', controller.default.home.getRanking)

    //拿到所有收藏夹
    router.post('/default/getFavorites', controller.default.home.getFavorites)

    //根据id找用户
    router.get('/default/findUserById/:userId', controller.default.home.findUserById)
}