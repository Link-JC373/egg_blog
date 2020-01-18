const loginRule = {
    userName: 'string',
    passWord: 'string',
    // pw: {
    //     type: 'String',
    //     required: true,
    // },
}

const addPointRule = {
    articleId: 'int',
    userId: 'int'
}

const userInfoRule = {
    imgUrl: {
        type: 'string',
        required: false,
    },
    userName: {
        type: 'string',
        required: false,
    },
    disc: {
        type: 'string',
        required: false,
    },
    id: 'int'

}

const addCommentRule = {
    userId: 'int',
    articleId: 'int',
    commentContent: 'string'
}

module.exports = {
    loginRule,
    addPointRule,
    userInfoRule,
    addCommentRule
}