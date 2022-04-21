//const bagOfWordsFile = require('../nlp/bagOfWord.py') //check python
const picFile = require('./getImageFromTxt')
const spawn = require('child_process').spawn

// const picUrl = picFile.getImageFromText(popularWordsStr, title).then((resPicUrl) => {
//     return resPicUrl
// });

const getPicFromText = async (text, title) => {
    return await new Promise((resolve) => {
        const bagOfWordsFile = spawn('python', ['../nlp/bagOfWord.py', text])

        //get the frequency words of the text from python file
        bagOfWordsFile.stdout.on('data', async (freqWord) => {
            //console.log('sdtout:' + textFromPy);
            resolve(freqWord)

            //getUrl
            // await picFile.getImageFromText(freqWord, title).then((resPicUrl) => {
            //     console.log(resPicUrl)
            // });
        });
    })
}

module.exports = { getPicFromText }

// func(text, title).then((data) => {
//     bufferToStr = data.toString('utf8')
//     console.log(bufferToStr)
// })

