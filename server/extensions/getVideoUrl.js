const videoUrlFile = require('./getVideoUrlApi')
const spawn = require('child_process').spawn
const path = require('path');


// Get text and title --> run BOW in python file --> get the frequency words --> return video url according them
const getVideoFromText = async (text) => {
    return await new Promise((resolve) => {
        const BowFilePath = path.join(__dirname, `../nlp/bagOfWord.py`)
        const bagOfWordsFile = spawn('python', [BowFilePath, text])

        //get the frequency words of the text from python file
        bagOfWordsFile.stdout.on('data', async (freqWord) => {

            //getVideoUrl
            //freqWord = search query 
            await videoUrlFile.getVideoFromText(freqWord).then((objVideo) => {
                resolve(objVideo.link)
            });
        });
    })
}

// text = 'Machine Learning: Allow the computer to learn from examples, Runs on a variety of computational tasks where classic programming is not possible. Supervised Learning. Unsupervised Learning. Reinforcement Learning. ',
//     'Data Set: Data For Learning, Examples - with or without “results”. Occam’s Razor: prefer a simple model if possible. ',
//     'Machine Learning Text Mining Learning Algorithm Text mining for market prediction Conclusions ',
//     'Technology development. Documents go digital: Need to search for information digitally. Strong field, a lot of money, very popular. ',
//     'Generalize to new examples: The ability of the model to properly adapt to previously unseen data. Dimensionality Reduction: Data from a high-dimensional space into a low-dimensional. NLP – Natural Language Processing. '
// getVideoFromText(text).then();
module.exports = { getVideoFromText }