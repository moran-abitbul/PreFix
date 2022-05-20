const fs = require('fs');
const https = require('https');
const CloudConvert = require('cloudconvert');
const path = require('path');

// Tair
const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2JiODY0N2NhNzMzMGI1NmMyMjQ2N2UyNTAwYjBhZWFiYmFkN2U0Y2I4ODQ5YTRjYWRkN2RjZGQ1ZWM4OTVhNmIwYTE0ZmJkODdlNDczNjIiLCJpYXQiOjE2NTI5OTE4MDguMjk3NjUsIm5iZiI6MTY1Mjk5MTgwOC4yOTc2NTIsImV4cCI6NDgwODY2NTQwOC4yOTM5ODQsInN1YiI6IjU2ODk0MjY1Iiwic2NvcGVzIjpbInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIiwid2ViaG9vay5yZWFkIiwid2ViaG9vay53cml0ZSIsInByZXNldC5yZWFkIiwicHJlc2V0LndyaXRlIl19.p9GkR82AX7wh7u8znjVJNsACEHd-XeBnkK1LJUm_4y_QCMgi8U7cBqYekYp7vvJjBV4aqcRrGr6LdH4taTy1gSZPRy7YdOEAoNgZu5YH1yGZAwDmeXLPXwS2A1GfEXM8r29CyFMjwZgLNnODPpQy4nQKib881S1jseIP0wrt5el6wS55zxC4CvUSVyu_6yXFh8eXySeKR058enUaQXf1JaqRj_gp3snHhEJFyPXA07cxf4olQsyovhfsuijGryvm0s-r4nb-o3HN5NzB25eZZZ3CzVhCQX1NfEAwnX_Iv3x2IA7Boqe6ZX0g3n7432PQ5QnlSVj9f7FmE2i9eQmUZd2p8ctKWd7la6Zw18fsb5g2IiEF9mtZKSemoDsPnpsl_thTDpvqUmHpBSvOS_6z7jOYPEkbvHmjZh9QQtMtQ0D5L-qoTC8FLZ5rEPDnDEc2MnMxqtp0Uj800CX8-OP2NCxzeYyLVgoSCGYjDbHcvnLZoPWOPK327URyT3bakHIzlpBVG0YfmsQ0rbjhoCEVRN849ITMSN3HIRR35uBRH-p4q2RmNpKweZc9t3gQieTf_r0y3-fDTRKHEA1ZDpAbQ645C89brQr9QaBP8_5LoJyPMxO5ahBIdNCDukS87g0y24ECm42exl3N8o8_RD295rBzPdb7j4ZXzbF7bsv5mv4'

//Moran
//const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGNhNjU1NGVlYzgwNGM1ZWIyNjNmNzA3M2I0NGY3YTE2ZjM2MzgxYzgxZWRhZTZjNjVjYTEzZTVkOTUxMDFjZGMzNmVjMzhiNzQ2N2ZiYzQiLCJpYXQiOjE2NTI5ODg4ODguNzQwODU5LCJuYmYiOjE2NTI5ODg4ODguNzQwODYzLCJleHAiOjQ4MDg2NjI0ODguNzI4MTYzLCJzdWIiOiI1NzAzOTA1MyIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQud3JpdGUiLCJwcmVzZXQucmVhZCJdfQ.S32gW0vDGopMh-RzqZeajAUAoKftMU4m4s1Of-mKpu-RrQXcUqkr034PhQWhFm4PKasCOyld7D8UWICoHttpDI2Ju7gGBQJXdAy4q4_U1MEYAkyyKFY6USdO4GHsUS_aOXocoKtOgAN-OcNAAUiR8X6h3RCYD0gjiK3BLZh_ot2ftEbstQNZPeB4JUvVTmDQd3SjI74LQYGxP2BpTIkMZN-Mk-kbzYcf4_szrJGiDRx4FCLNn7Mm-Piyry8-bugVa4mp0Uuw3AUB2ScO_X40gLPa1yt-SpSWLwev71hpT97YE3XbKD8JOp_iDgEsw50XJhnQ-_E1TrcxSglFZpZf8s1nFqAIAvBt-xdjkbZRkFBdKzhATCj0XyE7Tl-GlYWuAIiJqxL6baykpiLcHVr587C923so6sW67l6GM-7R97jfNCSspmKJ7-WPE5RkgbfZmFOtFubqLV3OVJD5Mmfih-vx042ShAih60BH3zzQrBB-Me_OzZ-nJjwKHSaTaoCbwvoExsunaajPC5oQvDlE7bNrhZS4A7kljvKy914mnOdck3V6xyipxXJtaVbhAtWMV4TzogzeX4lZqIxqgnMHKjX2-UbdwrTApLaxh321As2pod17mzsTzpOm5rAmzq-sfxvG4-J2er-UxW2FRUFAiZV8SSUlEkS779XFStxbI84'

const cloudConvert = new CloudConvert(api_key);

async function output(fileName) {
    //async function output() {

    var job = await cloudConvert.jobs.create({
        tasks: {
            'import-my-file': {
                operation: 'import/upload',
            }
            ,
            'convert-my-file': {
                operation: 'convert',
                input: 'import-my-file',
                input_format: "pptx",
                //output_format: 'pdf',
                output_format: 'jpg',
                some_other_option: 'value',
                engine: "office",
                //pages: "1-2",
                pixel_density: 300,
                hidden_slides: false,
                output_type: "slides",
                //slides_per_handout_page: 6,
                filename: "slidePic.jpg"
            },
            'export-my-file': {
                operation: 'export/url',
                input: ['convert-my-file'],
                inline: false, // Download files instead of display them 
                archive_multiple_files: false // Multiple files will create multiple export URLs. (No zip)
            }
        },
        tag: "jobbuilder"
    });

    // Create upload task 
    const uploadTask = job.tasks.filter(task => task.name === 'import-my-file')[0];

    const importPath = path.join(__dirname, `./uploads/${fileName}`) // take the file from this path
    //const importPath = path.join(__dirname, './OP.pptx') // take the file from this path

    //const inputFile = fs.createReadStream('./uploads/example.pptx');
    const inputFile = fs.createReadStream(importPath);
    //const inputFile = fs.createReadStream(`./uploads/${fileName}`);

    //console.log(inputFile);
    // Upload the presentation 
    await cloudConvert.tasks.upload(uploadTask, inputFile, `${fileName}`);
    //await cloudConvert.tasks.upload(uploadTask, inputFile, 'OP.pptx');


    //convert
    // const convertTask = job.tasks.filter(task => task.name === 'convert-my-file');
    // const ConvertFile = convertFile.result.files[0];


    // Download
    job = await cloudConvert.jobs.wait(job.id); // Wait for job completion

    const exportTask = job.tasks.filter(task => task.operation === 'export/url' && task.status === 'finished')[0];

    // Array of all the pictures
    const files = exportTask.result.files;

    const downloadFile = async (filename, fileUrl) => {
        return new Promise((resolve, reject) => {
            //let writeStream = fs.createWriteStream('./slidsPic/' + filename);
            //let writeStream = fs.createWriteStream('../client/my-app/src/comps/showChange/slidePic/' + filename);

            const pathToDownload = path.join(__dirname, `../client/my-app/src/comps/showChange/slidePic/`) // download the file to this path

            //let writeStream = fs.createWriteStream('../client/my-app/src/comps/showChange/slidePic/' + filename);
            let writeStream = fs.createWriteStream(pathToDownload + filename);

            https.get(fileUrl, (res) => {
                res.pipe(writeStream);
            });
            // on finish event resolve the promise
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);

        });
    }

    files.forEach(async (file) => {
        downloadFile(file.filename, file.url);
    });


    // await new Promise((resolve, reject) => {
    //     writeStream.on('finish', resolve);
    //     writeStream.on('error', reject);

    // });
    return files;
}

//output('test.pptx');


// // Download
// job = await cloudConvert.jobs.wait(job.id); // Wait for job completion

// const exportTask = job.tasks.filter(task => task.operation === 'export/url' && task.status === 'finished')[0];

// const file = exportTask.result.files[0];

// //Download all the file to this location
// const writeStream = fs.createWriteStream('./testing/server/slidsPic/' + file.filename);

// // Download the file from the url to the correct location
// https.get(file.url, function (response) {
//     response.pipe(writeStream);
// });

// await new Promise((resolve, reject) => {
//     writeStream.on('finish', resolve);
//     writeStream.on('error', reject);
// });




module.exports = { output };