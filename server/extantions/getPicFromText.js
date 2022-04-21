
//const bagOfWordsFile = require('../nlp/bagOfWord.py') //check python
const picFile = require('./getImageFromTxt')


// const text = 'Data Set: Data For Learning, Examples – with or without “results” Occam’s Razor: prefer a simple model if possible';

// const bagOfWordsFile = spawn('python', ['../nlp/bagOfWord.py', text])

// freq = '';

// //get the frequency words of the text from python file
// bagOfWordsFile.stdout.on('data', (textFromPy) => {
//     freq += textFromPy.toString();
// });

// bagOfWordsFile.stdout.on('end', () => {
//     console.log('freq', freq);
// });

// //bagOfWordsFile.stdin.write(JSON.stringify(text));
// bagOfWordsFile.stdin.end();

// const picUrl = picFile.getImageFromText(popularWordsStr, title).then((resPicUrl) => {
//     return resPicUrl
// });


const func = (text, title) => {

    //return await new Promise((resolve) => {

    var spawn = require('child_process').spawn, bagOfWordsFile = spawn('python', ['../nlp/bagOfWord.py']), textToPy = text, popularWordsStr = '';

    bagOfWordsFile.stdin.write(JSON.stringify(textToPy));

    //get the frequency words of the text from python file
    bagOfWordsFile.stdout.on('data', (textFromPy) => {
        popularWordsStr += textFromPy.toString();
    });

    console.log(popularWordsStr);

    // bagOfWordsFile.stdout.on('end', function () {
    //     //console.log('freq', popularWordsStr);
    //     console.log(popularWordsStr)

    //     //getUrl
    //     // await picFile.getImageFromText(popularWordsStr, title).then((resPicUrl) => {
    //     //     console.log(resPicUrl)
    //     //     resolve(resPicUrl)
    //     // });
    // });

    bagOfWordsFile.stdin.end();

    //})
}


const text = 'Data For Learning, Examples – with or without “results” Occam’s Razor: prefer a simple model if possible';
const title = 'Data Set:'

func(text, title)

//.then((picUrl) => console.log(picUrl));
// module.exports = { func }
