const express = require('express');
const router = express.Router()
const multer = require('multer');
const PresentationModel = require('../models/PresentationModel')

router.use(function (req, res, next) {
    console.log(req.url, "@", Date.now());
    next()
});

// File (presentation) storage in disk
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
        //cb(null, file.originalname)
    }
});

//Option to save only one file
const upload = multer({ storage }).single('file');

//End point to save this data
//Create and send data to server
router.
    route('/')
    .post((req, res) => {
        upload(req, res, (err) => {
            if (err) {
                //console.log(err)
                return res.status(500).json(err)
            }
            else {
                //return res.status(200).send(req.file)
                //console.log(req.file)
                const newPresentation = new PresentationModel({
                    name: req.file.originalname,
                    file: {
                        data: req.file.filename,
                        contentType: 'pptx'
                    }
                })
                newPresentation.save()
                    .then(() => res.send('successfully uploaded'))
                    .catch(err => console.log(err))

                //res.send("Single file upload success");
            }
        })
    });

// router
//     .route("/fileUploader")
//     .get((req, res) => {
//         res.send("hi get /fileUploader" + req.params);
//     })
//     .post((req, res) => {
//         res.send("hi post /fileUploader");
//         res.status(200).json({ data: data, msg: "added successfully" })
//         console.log('yes')
//     });


module.exports = router;