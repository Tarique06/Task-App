const express = require("express")
const cors = require("cors")

//Express builds REST APIs
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var corsOptions = {
    origin: "http://localhost:8081"
}

//cors provides Express middleware for allowing CORS with different options
app.use(cors(corsOptions))

const db = require("./models/index")
db.sequelize.sync()

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Task Application." })
})

app.use(require('./routes/auth.routes'))

const users = require("./routes/users.routes")
app.use('/api/users', users)

const tasks = require("./routes/task.routes")
app.use('/api/tasks', tasks)

// set port, listen for requests
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
