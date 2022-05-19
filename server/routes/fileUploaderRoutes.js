const express = require('express');
const router = express.Router()
const multer = require('multer');
const picName = require('../getArrayPicName')
const presData = require('../getPresDate');
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

                // Get fileName and return picture array for this file
                const getArrayOfPicNames = async (fileName) => {
                    return await new Promise((resolve) => {
                        picName.getArray(fileName).then(array => {
                            resolve(array);
                        })
                    })
                }

                const saveAndSend = async () => {

                    //not run this code
                    //get the original pic array before change
                    // const arrayOfPicNamesBefore = await getArrayOfPicNames(req.file.filename).then((array) => {
                    //     return array;
                    // })                    



                    // need synchronization ->  get file name and just them download the pic of him

                    //send the file name to edit and get new file name
                    // let fileNameSaved = await presData.getNameUpdated(req.file.filename).then((name) => {
                    //     return name;
                    // })

                    //run this code

                    // Get picture array of the updated file
                    // let arrayOfPicNamesAfter = await getArrayOfPicNames(fileNameSaved).then((array) => {
                    //     return array;
                    // })

                    const arrayOfPicNamesAfter = await presData.getNameUpdated(req.file.filename).then(async (fileNameSaved) => {
                        console.log('file name saved: ' + fileNameSaved)
                        await getArrayOfPicNames(fileNameSaved).then((array) => {
                            return array;
                        })
                    })


                    //const arrayOfPicNamesAfter = ['slidePic.jpg', 'slidePic-2.jpg','slidePic-2.jpg', 'slidePic.jpg', 'slidePic-2.jpg','slidePic-2.jpg']

                    //save presentation to db
                    newPresentation.save()
                        //.then(() => res.send('successfully uploaded'))
                        .then(() => res.send(arrayOfPicNamesAfter))
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