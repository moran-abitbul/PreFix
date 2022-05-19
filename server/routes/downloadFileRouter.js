const express = require('express');
const router = express.Router()
const path = require('path');
var bodyParser = require('body-parser');

router.use(function (req, res, next) {
    console.log(req.url, "@", Date.now());
    next()
});

router.use(bodyParser.urlencoded({ extended: false }))

fileDownloadPath = ''
//get request for download the file 
router
    .route('/') // Home = downloadFile
    .post((req, res) => {
        var fileDownloadName = req.body.updatedFile
        // console.log('post request in server');
        // console.log(fileDownloadName)
        fileDownloadPath = path.join(__dirname, `../uploads/${fileDownloadName}`);
        // console.log(fileDownloadPath);
    })
    .get((req, res) => {
        // console.log('get request in server');
        // console.log(fileDownloadPath)
        res.download(fileDownloadPath)
    });

module.exports = router;