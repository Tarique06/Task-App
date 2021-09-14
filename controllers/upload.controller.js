const fs = require('fs');
const db = require('../models/index');
const Image = db.Images;

exports.upload = (req, res) => {
    Image.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: fs.readFileSync(__basedir + '/resources/uploads/' + req.file.filename)
    }).then(image => {
        try {
            fs.writeFileSync(__basedir + '/resources/tmp/' + image.name, image.data);
            res.json({ 'msg': 'File uploaded successfully!', 'file': req.file });
        } catch (e) {
            console.log(e);
            res.json({ 'err': e });
        }
    })
};