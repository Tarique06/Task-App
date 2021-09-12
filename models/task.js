module.exports = (sequelize, Sequelize, User) => {
    const Task = sequelize.define('Tasks', {
        description: {
            type: Sequelize.STRING,
            required: true,
            trim: true
        },
        completed: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        Owner: {
            type: Sequelize.INTEGER,
            required: true
        }
    })

    return Task;
}