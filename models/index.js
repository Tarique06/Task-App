const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const Token = require("./token.js")(sequelize, Sequelize)
const Task = require("./task")(sequelize, Sequelize)

module.exports = {
    sequelize,
    Sequelize,
    Task,
    Token,
    Users: require("./users.js")(sequelize, Sequelize, Token, Task),
};
