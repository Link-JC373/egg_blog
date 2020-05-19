
module.exports = app => {
    const checktoken = app.middleware.jwt();
    const { router, controller } = app
    router.get('/admin/index', checktoken, controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.get('/admin/getPieData', controller.admin.main.getPieData)
    router.post('/admin/getHistogram', controller.admin.main.getHistogram)
    router.post('/admin/queryUser', controller.admin.main.queryUser)
    router.post('/admin/queryComment', controller.admin.main.queryComment)
    router.post('/admin/queryArticle', controller.admin.main.queryArticle)
    router.post('/admin/deleteUser', controller.admin.main.deleteUser)
    router.post('/admin/deleteArticle', controller.admin.main.deleteArticle)
}