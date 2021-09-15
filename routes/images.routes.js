const router = require('express').Router();
const controller = require('../controllers/upload.controller');
const upload = require('../middleware/upload')
const auth = require('../middleware/authenticate')

router.post('/image', auth, upload.single("uploadfile"), controller.upload);

module.exports = router;
