const controller = require("../controllers/task.controller");
const auth = require('../middleware/authenticate')
const tasks = require("express").Router();

// Create a new Task
tasks.post("/", auth, controller.create);

// Retrieve all Task
tasks.get("/", auth, controller.findAll);

// Retrieve a single Task with id
tasks.get("/:id", auth, controller.findOne);

// Update a Task with id
tasks.put("/:id", auth, controller.update);

// Delete a Task with id
tasks.delete("/:id", auth, controller.delete);

// Retrieve all published Tasks
tasks.get("/completed", auth, controller.findAllPublished);

module.exports = tasks