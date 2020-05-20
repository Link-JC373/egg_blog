
module.exports = app => {
    const checktoken = app.middleware.jwt();
    const { controller } = app
    const router = app.router.namespace('/api/admin')
    // router.get('/index', controller.default.home.index)
    router.get('/index', checktoken, controller.admin.main.index)
    router.post('/checkLogin', controller.admin.main.checkLogin)
    router.get('/getPieData', controller.admin.main.getPieData)
    router.post('/getHistogram', controller.admin.main.getHistogram)
    router.post('/queryUser', controller.admin.main.queryUser)
    router.post('/queryComment', controller.admin.main.queryComment)
    router.post('/queryArticle', controller.admin.main.queryArticle)
    router.post('/deleteUser', controller.admin.main.deleteUser)
    router.post('/deleteArticle', controller.admin.main.deleteArticle)
}