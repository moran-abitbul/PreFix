const bullet = '\u2022'
const subBullet = '\u25e6'
var hasSubBullet = false // not see subBullet yet 
var needSubBullet = false // at default begin sentence with bullet

const arrangeStr = (str) => {

    var countWordBeforeDot = 0 // Number of word in this paragraph
    newStr = ' '
    wordSize = 0 //number of letters in word

    // start the sentence with subBullet
    if (needSubBullet) {
        newStr = '\t'
        newStr += subBullet
        hasSubBullet = true
        needSubBullet = false
    }
    // start the sentence with bullet
    else {
        newStr = bullet
    }

    // Run on all the string
    for (let i = 0; i < str.length; i++) {

        // i in the end of the word- there are \n after a:r
        if (str[i] === ':' && i == str.length - 1) {
            newStr += str[i]
            needSubBullet = true // to the next paragraph
            countWordBeforeDot = 0
        }

        else if (str[i] === ':' && i < str.length - 1) {
            newStr += ':\n\t'
            newStr += subBullet
            hasSubBullet = true
            countWordBeforeDot = 0 //new
        }

        else if (str[i] === '.' && i < str.length - 2) {
            newStr += '.\n'
            newStr += bullet
            countWordBeforeDot = 0 //new
        }

        //',' in sentence with subBullet
        else if (str[i] === ',' && countWordBeforeDot >= 5 && hasSubBullet) {
            // newStr += ',\n\t'
            newStr += '.\n\t'
            newStr += subBullet
            hasSubBullet = true
            countWordBeforeDot = 0 //new
        }
        //',' in sentence without subBullet
        else if (str[i] === ',' && countWordBeforeDot >= 8) {
            // newStr += ',\n\t'
            newStr += '.\n\t'
            newStr += subBullet
            hasSubBullet = true
            countWordBeforeDot = 0 //new
        }

        // else if (str[i] === ',') {
        //     newStr += ',\n\t'
        //     newStr += subBullet
        //     countWordBeforeDot = 0
        // }

        // not consider 2 letters (as, of, in, to etc), and '-' '_'  as a word
        else if (str[i] === ' ' && str[i + 1] != '-' && str[i + 1] != '_' && str[i + 1] != '') {

            //consider word just if it contains more than one character
            if (wordSize > 2) {
                countWordBeforeDot += 1
            }

            newStr += str[i]
            wordSize = 0
        }

        //() in new line
        // else if (str[i] === '(' && countWordBeforeDot > 7) {
        //     newStr += '\n)'
        // }
        // else if (str[i] === ')' && countWordBeforeDot > 7) {
        //     newStr += ')\n'
        // }

        //no special case, just copy the letter     
        else {
            newStr += str[i]
            wordSize += 1
        }

        // long sentence with sub-bullet, contain more than 7 words , need \t\n to the next
        if (countWordBeforeDot > 7 && hasSubBullet && i <= str.length - 2) {
            newStr += '\n\t '
            countWordBeforeDot = 0
        }
        // sentence begin with bullet, and contain more than 10 word,  need just \n to the next 
        else if (countWordBeforeDot > 10 && i != str.length - 1) {
            newStr += '\n'
            countWordBeforeDot = 0
        }

        //check when to new line when i have not a dot or , 
        else if (countWordBeforeDot == 10) {
            newStr += '\n'
            countWordBeforeDot = 0
        }

    }

    hasSubBullet = false
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

        // if i different from 0
        if (i != indexTitle[0]) {

            //the paragraph is not a array
            if (typeof para === 'string') {
                strAfterArrange = arrangeStr(para)
                shapePara[i] = strAfterArrange
            }

            // the paragraph has array of a:r
            else if (typeof para === 'object') {

                //for all the runText in the paragraph 
                for (let j = 0; j < para.length; j++) {
                    runText = para[j];

                    if (typeof runText === 'string') {
                        strAfterArrange = arrangeStr(runText)
                        para[j] = strAfterArrange
                    }

                    else { //if the object contain inner array
                        runText = runText[0]
                        strAfterArrange = arrangeStr(runText)
                        para[j][0] = strAfterArrange
                    }

                    // strAfterArrange = arrangeStr(runText)
                    // para[j][0] = strAfterArrange
                }
            }
        }
    }

    return shapePara
}

const getIndexTitle = (arrProperties) => {
    max = 0;
    index = [0, 0] //by default this is the index of the title
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