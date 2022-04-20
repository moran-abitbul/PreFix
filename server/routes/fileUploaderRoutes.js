const express = require('express');
const router = express.Router()
const multer = require('multer');
const picName = require('../getArrayPicName')

const startVisually = require('../visuals/updateVisualSlide');
const picArray = require('../picAPI');

const PresentationModel = require('../models/PresentationModel')

router.use(function (req, res, next) {
    console.log(req.url, "@", Date.now());
    next()
});

// File (presentation) storage in disk
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        //cb(null, Date.now() + '-' + file.originalname)
        cb(null, file.originalname)
    }
});

//Option to save only one file
const upload = multer({ storage }).single('file');

//End point to save this data
//Create and send data to server
router
    .route('/')
    .post((req, res) => {
        upload(req, res, (err) => {
            if (err) {
                //console.log(err)
                return res.status(500).json(err)
            }
            else {
                const newPresentation = new PresentationModel({
                    name: req.file.originalname,
                    file: {
                        data: req.file.filename,
                        contentType: 'pptx'
                    }
                })

                const getArrayOfPicNames = async (fileName) => {
                    return await new Promise((resolve) => {
                        picName.getArray(fileName).then(array => {
                            resolve(array);
                        })
                    })
                }

                const saveAndSend = async () => {

                    //Run this codeeeeeeeeeeeeeeeee

                    // const arrayOfPicNamesBefore = await getArrayOfPicNames(req.file.filename).then((array) => {
                    //     return array;
                    // })
                    const arrayOfPicNames = [1, 2]


                    //send the file to edit and get new file
                    newFileName = startVisually.func(req.file.filename).then(fileName => {return fileName;})
                    //choose additional properties of the file for send front/change name of some arrays

                    // const arrayOfPicNamesAfter = await getArrayOfPicNames(newFileName).then((array) => {
                    //     return array;
                    // })

                    newPresentation.save()
                        //.then(() => res.send('successfully uploaded'))
                        .then(() => res.send(arrayOfPicNames))
                        .catch(err => console.log(err))
                    //res.send("Single file upload success");
                    //return res.status(200).send(req.file)
                }

                saveAndSend();
            }
        })
    })
















// .get((req, res) => {
//     PresentationModel.find(function (err, res) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log(res)
//         }
//     })
// });




// router
//     .route("/f ileUploader")
//     .get((req, res) => {
//         res.send("hi get /fileUploader" + req.params);
//     })
//     .post((req, res) => {
//         res.send("hi post /fileUploader");
//         res.status(200).json({ data: data, msg: "added successfully" })
//         console.log('yes')
//     });


module.exports = router;