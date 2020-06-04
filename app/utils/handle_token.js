const JWT = require('jsonwebtoken')

function signToken(params, secret) {
    const token = JWT.sign(
        {
            userName: params.userName,
        },
        secret,
        {
            expiresIn: 60 * 60
        }
    )

    let openId = new Date().getTime()
    return { 'openId': openId, token }
}

module.exports = {
    signToken
}