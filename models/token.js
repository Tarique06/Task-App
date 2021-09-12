module.exports = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize

    const Token = sequelize.define("tokens", {
        jti: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, {
        tableName: "tokens",
    }
    )

    return Token
}