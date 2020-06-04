const JWT = require('jsonwebtoken')

module.exports = options => {
    return async function (ctx, next) {
        // console.log(ctx);

        //拿到穿回数据的header 中的token值
        const token = ctx.request.header['token']
        // const token = ctx.request.body
        const method = ctx.method.toLowerCase()

        //当前请求时 get 请求 ，执行接下来的中间件
        // if (method === 'get') {
        //     await next()
        // } else
        // console.log(token === null);
        console.log(token);

        if (Boolean(token)) {
            //当前token存在
            try {
                console.log(options.secret);

                const decode = JWT.verify(token, options.secret)
                console.log(decode);
                let user;
                // let userName = ctx.request.body
                console.log(ctx.request.url.indexOf('/admin/') !== -1);

                ctx.request.url.indexOf('/admin/') !== -1 ?

                    user = await ctx.model.Admin.findOne({
                        where: {
                            admin_name: decode.userName
                        }
                    })
                    :
                    user = await ctx.model.User.findOne({
                        where: {
                            username: decode.userName,
                        }
                    })

                // if (user.jwt !== token) {
                //     console.log(token);

                //     console.log(user.jwt);

                //     //验证传来的 token 是否和数据库里的一致
                //     return ctx.body = { status: 401, message: '没有权限，请登录' }

                // }
                if (!decode.userName) {
                    console.log("222222222222222222");

                    return ctx.body = { status: 401, message: '没有权限，请登录' }
                }
                if (Math.round(new Date() / 1000) - decode.exp > 0) {
                    //验证token是否过期
                    return ctx.body = { status: 401, message: '登录已过期,请重新登录' }
                }

                if (!user) {
                    console.log("4444444444444444");

                    return ctx.body = { status: 401, message: '用户信息验证失败,请重新登录' }
                }
                // return

                await next()
            } catch (error) {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!");

                console.log(error);
                return ctx.body = { status: 401, message: error }


            }

        } else {

            console.log(token);

            return ctx.body = { status: 401, message: '未登录，请登录' }

        }
    }
}