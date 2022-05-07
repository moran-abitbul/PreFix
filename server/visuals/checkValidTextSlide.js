const checkValidString = (str) => {

    var countWordBeforeDot = 0 // Number of word in this paragraph

    // Run on all the string
    for (let i = 0; i < str.length; i++) {

        //End of word
        if (str[i] === ' ') {
            countWordBeforeDot += 1
        }

        // ':' not at the end of sentence- not valid
        else if (str[i] === ':' && i !== str.length - 1) {
            console.log(' : not at end of paragraph')
            return false
        }

        else if (str[i] == '\t' && i != 0) {
            console.log(' "\t" not at the beginning')
            return false

        }
    }

    // check if sentence exist more than 10 word
    if (countWordBeforeDot >= 10) {
        console.log('error. more than 10 word in this sentence.')
        return false
    }

    return true
}

// array of paragraphs in specified shape
const checkValidText = (shapePara) => {
    shapePara = shapePara[0]
    // for all the paragraph in the shape
    for (let i = 0; i < shapePara.length; i++) {
        para = shapePara[i]

        //the paragraph is not a array
        if (typeof para === 'string') {

            if (!checkValidString(para)) {
                console.log('fail in para')

                return false
            }
        }

        // the paragraph has array of a:r
        else if (typeof para === 'object') {

            //for all the runText in the paragraph 
            for (let j = 0; j < para.length; j++) {
                runText = para[j][0];

                if (!checkValidString(runText)) {

                    console.log('fail in run text')
                    return false
                }
            }
        }
    }

    return true
}


// stringArr = [[["\t hello word word word word word: word word word word word"], ["hello word word word word word: word word word word word"]]
//     , "hello word word word word word: word word word word word",
//     "\tha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha ha"]

//     console.log(stringArr[0][0]);

// if (stringArr[2][0] == '\t') {
//     console.log('true with tab')
//     console.log('saw tab: \udef0')
// }

//checkValidText(stringArr)

module.exports = { checkValidText }
