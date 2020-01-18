module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next()
        } catch (err) {
            console.log(err);

            //所有异常都在app上触发一个error事件。框架会记录一条错误日志
            ctx.app.emit('error', err, ctx)
            const status = err.status || 500
            //生产环境时 500 错误的详细错误内容不返回给客户端
            const error = status === 500 && ctx.app.config.env === 'prod'
                ? 'Internal Server Error'
                : err.message

            //从 error 对象上读出各个属性， 设置到响应中
            ctx.body = { error }
            if (status === 422) {
                ctx.body.detail = err.errors
            }
            ctx.status = status
        }
    }
}