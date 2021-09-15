const { Sequelize, Users } = require("../models");
const { Op } = Sequelize;
const { sendWelcomeEmail } = require('../emails/account')

// Create and Save a new User
exports.create = async (req, res) => {
    const { age, name, email, password } = req.body
    try {
        // Validate request
        if (!age) {
            return res.status(400).send({
                message: "Age can not be empty!"
            })
        }
        if (!name) {
            return res.status(400).send({
                message: "Name can not be empty!"
            })
        }
        if (!email) {
            return res.status(400).send({
                message: "email can not be empty!"
            })
        }
        if (!password) {
            return res.status(400).send({
                message: "Password can not be empty!"
            })
        }

        await Users.create({ age, name, email, password })
        sendWelcomeEmail(email, name)
        return res.status(200).json({
            message: 'Created Database with Hashed password'
        })
    }
    catch (error) {
        console.warn(error)
        res.status(500).send(process.env.NODE_ENV === 'development' ? error : 'something went wrong');
    };
}

//Finding one User with id
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findByPk(id)
        if (!user) throw new Error('User not found')
        const token = await user.generateToken()
        console.log(token)
        return res.send({ user, token })
    }

    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

//Updating a User
exports.update = (req, res) => {
    const id = req.params.id;
    Users.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Update Successfully'
                })
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};


//Deleting a User
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};


