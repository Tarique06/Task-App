const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

const Token = require("./token.js")(sequelize, Sequelize)
const Task = require("./task")(sequelize, Sequelize)
const Images = require("./images")(sequelize, Sequelize)

module.exports = {
    sequelize,
    Sequelize,

    Images,
    Task,
    Token,
    Users: require("./users.js")(sequelize, Sequelize, Token, Task),
};
