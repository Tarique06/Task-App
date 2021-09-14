const router = require('express').Router();
const controller = require('../controllers/upload.controller');
const upload = require('../middleware/upload')

router.post('/api/uploadFiles', upload.single("uploadfile"), controller.upload);

module.exports = router;
