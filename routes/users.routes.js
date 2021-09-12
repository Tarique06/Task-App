const controller = require("../controllers/users.controller");
const requireAuth = require('../middleware/authenticate')
const router = require("express").Router();

// Create a new User
router.post("/", controller.create);

// Retrieve a single User with id
router.get("/:id", requireAuth, controller.findOne);

// Update a User with id
router.put("/:id", requireAuth, controller.update);

// Delete a User with id
router.delete("/:id", requireAuth, controller.delete);

module.exports = router