module.exports = app => {
    const { router, controller } = app
    router.get('/default/index', controller.default.home.index)
    router.post('/default/getArticleList', controller.default.home.getArticleList)
    router.post('/default/getArticleById', controller.default.home.getArticleById)
    router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
    router.post('/default/getMyComment', controller.default.home.getMyComment)
    // router.get('/default/getListById/:id', controller.default.home.getListById)
    router.post('/default/searchSomeThing', controller.default.home.searchArticle)
    router.post('/default/getArticleType', controller.default.home.getArticleType)
    router.post('/default/getComments', controller.default.home.getComments)
    router.post('/default/getToComments', controller.default.home.getToComments)
    router.post('/default/initFavArticle', controller.default.home.initFavArticle)
    router.post('/default/getFavArticle', controller.default.home.getFavArticle)
}