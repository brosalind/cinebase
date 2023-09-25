const jwt = require('jsonwebtoken')

const createToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET)
}

const checkToken = (token) => {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {createToken, checkToken}