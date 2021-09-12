const { Task, Sequelize } = require("../models");
const { Op } = Sequelize;

//creating a new Tasks
exports.create = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            user: req.user
        })
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send({
            message:
                e.message || "Some error occurred."
        })
        console.log(e)
    }
};

//Read all Tasks list
exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

    Task.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tasks."
            });
        });
};


//Finding one Tasks list with id
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id } })
        return res.status(200).json({ task })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tasks."
        });
    }
}


//updating an existing Tasks
exports.update = (req, res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tasks was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tasks with id=${id}. Maybe Tasks was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tasks with id=" + id
            });
        });
};

//deleting an existing Tasks
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tasks was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tasks with id=${id}. Maybe Tasks was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tasks with id=" + id
            });
        });
};

