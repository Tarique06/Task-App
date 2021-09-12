const jwt = require('jsonwebtoken')
const util = require('util')


const signToken = util.promisify(jwt.sign)
const verifyToken = util.promisify(jwt.verify)

const secret = 'ThisIsTaskApp'

module.exports = {
    sign(payload, options) {
        return signToken(payload, secret, options)
    },
    verify(token) {
        return verifyToken(token, secret)
    }
}