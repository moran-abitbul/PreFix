const picUrlFile = require('./getPicUrlApi')
const spawn = require('child_process').spawn

// Get text and title --> run BOW in python file --> get the frequency words --> return pic url according them
const getPicFromText = async (text, title) => {
    return await new Promise((resolve) => {
        console.log('in picUrl. text:');
        console.log(text);
        const bagOfWordsFile = spawn('python', ['../nlp/bagOfWord.py', text])


        //get the frequency words of the text from python file
        bagOfWordsFile.stdout.on('data', async (freqWord) => {
            //resolve(freqWord)

            //getUrl
            await picUrlFile.getImageFromText(freqWord, title).then((resPicUrl) => {
                resolve(resPicUrl)
            });
        });
    })
}

// text = 'machine learning comupter yes'
// title = 'introduction'

// get data from python buffer 
// getPicFromText(text, title).then((data) => {
//     bufferToStr = data.toString('utf8')
//     console.log(bufferToStr)
// })

module.exports = { getPicFromText }