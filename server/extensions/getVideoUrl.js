const videoUrlFile = require('./getVideoUrlApi')
const spawn = require('child_process').spawn

// Get text and title --> run BOW in python file --> get the frequency words --> return video url according them
const getVideoFromText = async (text) => {
    return await new Promise((resolve) => {
        const bagOfWordsFile = spawn('python', ['../nlp/bagOfWord.py', text])

        //get the frequency words of the text from python file
        bagOfWordsFile.stdout.on('data', async (freqWord) => {

            //getVideoUrl
            //freqWord = search query 
            await videoUrlFile.getVideoFromText(freqWord).then((resVideoUrl) => {
                resolve(resVideoUrl)
            });
        });
    })
}

module.exports = { getVideoFromText }