const { Users, Token } = require('../models')
const jwt = require('../lib/jwt')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        if (!authHeader)
            throw new Error('Missing auth header')

        const token = authHeader.replace('Bearer ', '')
        const { jti, sub } = await jwt.verify(token)
        console.log('auth-mw', { jti, sub })

        if (!await Token.findOne({ where: { jti } }))
            throw new Error('Token deleted')

        const user = await Users.findByPk(sub)
        if (!user)
            throw new Error('User not found')

        req.token = { jti, sub }
        req.user = user

        next()
    }
    catch (error) {
        console.error(error)
        res.status(401).send({ message: 'Unauthorized' })
    }
}
module.exports = auth