const multer = require("multer");
const { nanoid } = require("nanoid/async");

const imageFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "resources/uploads/");
    },
    filename: async (req, file, cb) => {
        const id = await nanoid()
        cb(null, `${id}-${file.originalName}`)
    },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;

