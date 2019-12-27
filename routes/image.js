const router = require('express').Router();
const upload = require('../middlewares/gcsUpload');
const { authenticate } = require('../middlewares/auth');

router.use(authenticate);

router.post('/', upload.single('image'), (req, res) => {
    let img = req.body;
    res.status(200).json(img);
});

module.exports = router;
