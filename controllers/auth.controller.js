const { pick } = require('ramda')
const { Token, Users } = require('../models')

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body
            console.dir({ email, password })

            const user = await Users.scope('withPassword').findOne({ where: { email } })
            if (!user)
                throw new Error('User not found')
            await user.verifyPassword(password)
            const token = await user.generateToken()

            return res.status(200).json({ user: pick(['age', 'name'], user), token })
        }
        catch (error) {
            console.error(error)
            return res.status(403).json({ message: 'Unauthorized' })
        }
    },


    async logout(req, res) {
        const { jti } = req.token
        try {
            await Token.destroy({ where: { jti } })
            res.status(200).json({ message: 'success' })
        } catch (error) {
            console.error(error)
            return res.json({ 'status': 400 })
        }
    }
}