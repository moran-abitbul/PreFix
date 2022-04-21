const tab = '  '//\ud808\udef0'
const newLine = '\n'
const bullet = '\u2022'

const arrayString = (arrStringAndProperties) => {
    
    str = arrStringAndProperties[0];
    properties = arrStringAndProperties[1];

    indexTitle = getIndexTitle(properties);
    let title = str[indexTitle[0]][indexTitle[1]];

    if(title.toLowerCase() === 'outline ') {
        return str;
    }

    for (i in str) {
        for (j in str[i]) {
            if (i == indexTitle[0] && j == indexTitle[1]) { //isTitle
                str[i][j] = creatBullet(str[i][j], true)
            } else {
                str[i][j] = creatBullet(str[i][j], false)
            }
        }
    }
    return str;
}

const getIndexTitle = (arrProperties) => {
    max = 0;
    index = []
    for (let i in arrProperties) {
        for (let j in arrProperties[i]) {
            let size = arrProperties[i][j][0]['$']['sz']
            if (size > max) {
                max = size
                index[0] = i
                index[1] = j
            }
        }
    }
    return index;
}

const creatBullet = (str, isTitle) => {
    if (isTitle) {
         newStr = ' '
    } else {
        newStr = bullet + ' '
    }

    for (let ch = 0; ch < str.length - 2; ch++) {
        if (str[ch] == ':' || str[ch] == ',') {
            newStr += str[ch] + '\n' + '    '
        } else {
            if (str[ch] == '.') {
                newStr += str[ch] + '\n' + bullet
            } else {
                newStr += str[ch]
            }

        }
    }

    if (str[str.length - 1] != '.') {
        newStr += str[str.length - 1]
    }
    //console.log(newStr);
    return newStr;
}

module.exports = { arrayString }
