const fs = require('fs');
const db = require('../models/index');
const Image = db.Images;
const path = require('path')

exports.upload = async (req, res) => {
    try {
        const image = await Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(path.join(__basedir, 'resources', 'uploads', req.file.filename))
        })
        fs.writeFileSync(path.join(__basedir, 'resources', 'tmp', image.name), image.data);
        res.json({ 'msg': 'File uploaded successfully!', 'file': req.file });
    } catch (e) {
        console.error(e);
        res.json({ 'err': e });
    }
}
