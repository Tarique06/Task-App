const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/resources/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Math.random() + "-" + file.originalname)
    }
});

const uploadFile = multer({ storage });

module.exports = uploadFile;

