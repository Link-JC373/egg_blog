
module.exports = app => {
    const checktoken = app.middleware.jwt();
    const { router, controller } = app
    router.get('/admin/index', checktoken, controller.admin.main.index)
    router.post('/admin/checkLogin', checktoken, controller.admin.main.checkLogin)
    router.post('/admin/test', checktoken, controller.admin.main.test)
}