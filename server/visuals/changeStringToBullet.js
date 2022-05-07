const tab = '  '//\ud808\udef0'
const newLine = '\n'
const bullet = '\u2022'

const arrangeStr = (str) => {

    var newStr = bullet
    var countWordBeforeDot = 0 // Number of word in this paragraph

    // Run on all the string
    for (let i = 0; i < str.length; i++) {

        //End of word

        // ':' not at the end of sentence- not valid
        if (str[i] === ':' && i < str.length - 2) {
            newStr += ':\n\t'
        }

        else if (str[i] === '.' && i < str.length - 2) {
            newStr += '\n'
            newStr += bullet
        }

        else if (str[i] === ',' && countWordBeforeDot >= 7) {
            newStr += ',\n\t'
            countWordBeforeDot = 0
        }
        else if (str[i] === ' ') {
            countWordBeforeDot += 1
            newStr += str[i]
        }
        else {
            newStr += str[i]
        }

        //check when to new line when i have not a dot or , 
        // else if (countWordBeforeDot == 10) {
        //     newStr += '\n'
        //     countWordBeforeDot = 0
        // }

    }

    return newStr
}

// array of paragraphs in specified shape
const changeText = (arrStringAndProperties) => {

    shapePara = arrStringAndProperties[0];
    properties = arrStringAndProperties[1];
    indexTitle = getIndexTitle(properties);
    let title = shapePara[indexTitle[0]][indexTitle[1]];

    // for all the paragraph in the shape
    for (let i = 0; i < shapePara.length; i++) {
        para = shapePara[i]

        if (i != indexTitle) {

            //the paragraph is not a array
            if (typeof para === 'string') {
                strAfterArrange = arrangeStr(para)
                shapePara[i] = strAfterArrange
            }

            // the paragraph has array of a:r
            else if (typeof para === 'object') {

                //for all the runText in the paragraph 
                for (let j = 0; j < para.length; j++) {
                    runText = para[j][0];
                    strAfterArrange = arrangeStr(runText)
                    para[j][0] = strAfterArrange
                }
            }
        }
    }

    return shapePara
}

const getIndexTitle = (arrProperties) => {
    max = 0;
    index = []
    for (let i in arrProperties) {
        for (let j in arrProperties[i]) {
            let size = arrProperties[i][j][0]['$']['sz']
            if (size > max) {
                max = size
                index[0] = i;
                index[1] = j;
            }
        }
    }
    return [0, 0];
}

module.exports = { changeText }