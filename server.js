require('dotenv').config()
const express = require("express")
const cors = require("cors")
const multer = require('multer');

//Express builds REST APIs
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

const db = require("./models/index")
db.sequelize.sync();


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Task Application." })
})

app.use(require('./routes/auth.routes'))

const users = require("./routes/users.routes")
app.use('/api/users', users)

const tasks = require("./routes/task.routes")
app.use('/api/tasks', tasks)

global.__basedir = __dirname;
const upload = require("./routes/images.routes")
app.use('/api/upload', upload)

// set port, listen for requests
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
