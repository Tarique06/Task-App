const { nanoid } = require('nanoid/async')
const argon2 = require('argon2')
const jwt = require('../lib/jwt')

module.exports = (sequelize, Sequelize, Token, Task) => {
    const User = sequelize.define("users", {
        age: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: {}
            }
        }
    });

    /* Automatically hash password before saving user */
    User.beforeCreate(async (user, options) => {
        const hashedPassword = await argon2.hash(user.password)
        user.password = hashedPassword
    })

    User.prototype.generateToken = async function generateToken() {
        const jwtid = await nanoid()
        const token = jwt.sign({ sub: this.id }, { jwtid })
        const userToken = await Token.create({ jti: jwtid })
        await this.addToken(userToken)
        await userToken.setUser(this)
        return token
    }

    User.prototype.verifyPassword = async function verifyPassword(password) {
        console.log('verify Password instance method', { password, hash: this.password })
        return argon2.verify(this.password, password)
    }

    User.hasMany(Token)
    Token.belongsTo(User)

    User.hasMany(Task)
    Task.belongsTo(User)

    return User;
};