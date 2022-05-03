const express = require('express');
const router = express.Router()
const path = require('path');
const fileDownloadPath = path.join(__dirname, `../uploads/updated-semi.pptx`);

router.use(function (req, res, next) {
    console.log(req.url, "@", Date.now());
    next()
});

//get request for download the file 
router
    .route('/') // Home = downloadFile
    .get((req, res) => {
        res.download(fileDownloadPath)
    });

module.exports = router;