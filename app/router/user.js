
module.exports = app => {
    const checktoken = app.middleware.jwt();
    const { router, controller } = app
    router.post('/user/checkLogin', controller.user.user.checkLogin)
    router.post('/user/changeInfo', controller.user.user.changeInfo)
    router.post('/default/uploadImg', controller.user.user.upload)


    router.post('/user/addComment', controller.user.articleOptions.addComment)
    router.post('/user/addArticlePoint', controller.user.articleOptions.addArticlePoint)
    router.post('/user/reduceArticlePoint', controller.user.articleOptions.reduceArticlePoint)
}