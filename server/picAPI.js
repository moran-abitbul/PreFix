const fs = require('fs');
const https = require('https');
const CloudConvert = require('cloudconvert');

// Tair
//const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWEyNWU3OGU1NmI5ZmRhYmNmZDQwYWMyM2U0MmYzN2QzYmFmMzZkNGU0OGU1ZjcwMThlMjQ1ZGU0YzRkMGM0MjliNzMwNGVlZjUzOTkyYzQiLCJpYXQiOjE2NDc4OTQ5NzkuODk0MjMyLCJuYmYiOjE2NDc4OTQ5NzkuODk0MjMzLCJleHAiOjQ4MDM1Njg1NzkuODg5OTY1LCJzdWIiOiI1Njg5NDI2NSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwicHJlc2V0LndyaXRlIiwicHJlc2V0LnJlYWQiLCJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIiwid2ViaG9vay5yZWFkIiwid2ViaG9vay53cml0ZSJdfQ.QerdCk1lS6cuM8yQhRF5xFJCSu0drvrECcJca5W58k221xtFgBqbABZn-KvVM-X4r-0CFWwv19Dzg1UmIHXqoEKvk9km8jT5l4sjsGhiIzdNYn6GKsyGPqDyWTk-APWoBoMy3kOND3UuuEEZcYOgb0vbqPUK6mCVPeWAfoXAjKuCERyz5uGlslKD7GIpOWe6acdNiBF6iHMKlvynv5XkqPl6EnNI85G-1u0pE7UpBIsSDSZiroNh08TsQhwHjTS6nUH_yhmMzR75gPfyNxLw0aE426EjpJgaesVujJ3UATYMYYbxetyWN63cz-VJcL1dlsliolfUnKgdimTFoB9bg9WEw1mzU4tgmNYgn7s58073L1unSm8Y1nHFwe23jQd-aIxsjpdSVI73WRhdNMdDdX9hRyOjbxG9LLkJwusOcntXQLahqqPw0JYMmUkU2eoNzGIaBKpLw5z5f6iF8FLhiE4Hw4DV8a44fPUBgNWyGuofaxIfTdY16_7zC4teKNPq5PDI444sgwX0Hk_epHL2wXKuwDf-o6pZehVAATL8hTbrrgUn95zvrsbmW6xpW5rvW9YSTGpoTGTaU5_2LfdM1nJoXf9KqHkWP9NqUbPRJdjoyxQ-XIdhB-42eFwR1orhkrpIUGuApB0F_cyU2QWalP7OazpeL-WMTwIp-hoS16Y';

//Moran
const api_key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWJiZDc5OTVmMTZkNzBlMzkxNDQ5NWViMGVhYzg1OGU2MWM0MjM4N2IzMzEzZmU4MjhkZWEyN2M0NzU2NTFjMjY1MzcwMWU3ZmM4MjgxNDciLCJpYXQiOjE2NDg1MDQ3MjAuNTcwMzE0LCJuYmYiOjE2NDg1MDQ3MjAuNTcwMzE1LCJleHAiOjQ4MDQxNzgzMjAuNTY2MTI4LCJzdWIiOiI1NzAzOTA1MyIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.WRnWVso0IKKypKv-70KEEn-Gf1pDneGvLygJTTF1Y9VLRTwaJecQyJGbiczgmThH_PiXgkkYCe7WczbRuDMvWUMndFO9dnsL36Ed62ijYO3wm1KqQsKtJCqURoE-KHasXW4TifY6_SJM1JQjBwUdrJd_KCdL0F21KkHDcWgrNjKZLnccHY7xpukJ_bns30lgQ24cCrcuoGDErumL-e4B9vFsjMipKwNLEzJMimDFUqZX1r4V_D4M9TAjP33As15L-3ezvKavqpSoPRJQipeNImCnTSPqZV1-5xoE1NYMt9SuqmsWUHAuk3Xs8FB3wuSNFR2WcVbozneVVyiiH-J_07o9hFPcSMr-jQIZXl4I7RL_Kl044AtE7H6hqCDTcF6k9SFdTGtA2QaETfDjvwhc1JOrGQdqiqQEcPiTkBb2-aI-pvVAdvnRIchgKccsSXkukaMuxJG0Tni2H3Znsd2CKKr6tixQ6oZBRIcWevHm9paTBPQK6WE-RLK4DjtWaMUDzdwz_9zADd4LDlHYW76Qmn9eOgaF9nhh507ibTK2oU_lP6JsGzjBka1m3xDrVdTy3ZY5m1f3_p1xYkvbcSugXr55_3CUVxTO8LPwR1-_l87kTIl1B39S44E5otO6Dyn6BmlHDTIty99J5EAHA1EZrG2IPeK8m4gnvldWrzxXfSc';

const cloudConvert = new CloudConvert(api_key);

async function output() {

    let job = await cloudConvert.jobs.create({
        tasks: {
            'import-my-file': {
                operation: 'import/upload',
            }
            ,
            'convert-my-file': {
                operation: 'convert',
                input: 'import-my-file',
                input_format: "pptx",
                output_format: 'jpg',
                some_other_option: 'value',
                engine: "office",
                //pages: "1-2",
                pixel_density: 300,
                hidden_slides: false,
                output_type: "slides",
                slides_per_handout_page: 6,
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

    // The input =  presentation
    //                                      ./testing
    //dirname

    //const inputFile = fs.createReadStream('./picAPI.js');
    const inputFile = fs.createReadStream('./server/pres.pptx');


    // Upload the presentation 
    await cloudConvert.tasks.upload(uploadTask, inputFile, './example.pptx');

    //convert
    // const convertTask = job.tasks.filter(task => task.name === 'convert-my-file');
    // const ConvertFile = convertFile.result.files[0];


    // Download
    job = await cloudConvert.jobs.wait(job.id); // Wait for job completion

    const exportTask = job.tasks.filter(task => task.operation === 'export/url' && task.status === 'finished')[0];

    // Array of all the pictures
    const files = exportTask.result.files;


    const downloadFile = async (filename, fileUrl) => {
        return new Promise((resolve) => {
            let writeStream = fs.createWriteStream('./server/slidsPic/' + filename);
            https.get(fileUrl, (res) => {
                res.pipe(writeStream);
            });
            // on finish event resolve the promise
            writeStream.on('finish', resolve);
        });
    }

    files.forEach(file => {
        downloadFile(file.filename, file.url);
    });


    // await new Promise((resolve, reject) => {
    //     writeStream.on('finish', resolve);
    //     writeStream.on('error', reject);

    // });
}

output();


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