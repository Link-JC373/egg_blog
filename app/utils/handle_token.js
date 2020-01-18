const JWT = require('jsonwebtoken')

function signToken(res, secret) {
    const token = JWT.sign(
        {
            userName: res.data.dataValues.username,
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