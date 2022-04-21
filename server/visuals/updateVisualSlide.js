const fix = require('./fixContrast');
const PPTX = require('er-nodejs-pptx');
const changeString = require('./changeStringToBullet');
const path = require('path');
const extantion = require('../extantions/getPicFromText')


let pptx = new PPTX.Composer();

const start = async (fileName) => {

    const filePath = path.join(__dirname, `../uploads/${fileName}`);
    const fileSaveName = `updated-${fileName}`;
    const fileSavePath = path.join(__dirname, `../uploads/${fileSaveName}`);

    const pre = await pptx.load(filePath);

    //go through all the slides
    for (let i = 1; i < 2; i++) {
        console.log('start with slide - ' + i);
        var newColorText = new Array();
        var counterWithoutPic = 0;

        withPic = pre.getSlide(i).checkPic();
        if (!withPic) { counterWithoutPic++; } //count for slides without pic

        //without firs slide
        if (i != 1) {
            //fix the sentences
            textArray = pre.getSlide(i).getArrText(); //textArray[0] --> string, textArray[1] --> properties
            newTextArray = changeString.arrayString(textArray)
            pre.getSlide(i).setArrText(newTextArray, textArray[1]);
        }

        if (counterWithoutPic == 3) {
            var textSlide = '' //create string for get pic
            for (text of textArray[0]) {
                textSlide += text.join(' ')
            }

            //get pic url from API
            picUrl = extantion.getPicFromText(textSlide, 'title').then((url) => {
                return (url.toString('utf8'))
            })
            pre.getSlide(i).addImage(picUrl);

            counterWithoutPic = 0;
        }

        //original background color
        backgroundColor = pre.getSlide(i).getBackgroundColor();
        //console.log("background color: " + backgroundColor);

        //array of shape that each index is an array of original colors of the sentences
        colorText = pre.getSlide(i).getArrColors();
        //console.log(colorText);

        //array of shape that each index is an array of the sentences
        shapeTextArray = pre.getSlide(i).getArrText();
        //console.log(shapeTextArray);

        valColorText = getValColor(colorText);

        //update the background color
        updateBackground = await fix.checkContrast(backgroundColor, valColorText).then(array => {
            return array[0]; //colorbackground and text first
        });
        //console.log("updateBackground: " + updateBackground);

        //if there more then 1 color of text
        for (let j = 0; j < colorText.length; j++) { //num of shape
            newColorText[j] = new Array();
            for (let k = 0; k < colorText[j].length; k++) { //num of row text in one shape
                await fix.textContrast(updateBackground, colorText[j][k]).then(colorText => {
                    newColorText[j].push(colorText)
                });
            }
        }


        // change slide
        var slide_i = pre.getSlide(i);
        console.log("change color in slide: " + i);
        //console.log(newColorText);
        slide_i.backgroundColor(updateBackground);
        for (let i = 0; i < newColorText.length; i++) { //index for shape
            for (let j = 0; j < newColorText[i].length; j++) { //index for row in 
                slide_i.textColorToChange(newColorText[i][j], i, j);
            }
        }

    }

    pre.save(fileSavePath);
    console.log("saved");

    return fileSaveName;

}

const getValColor = (arrayTextColor) => {
    for (let i in arrayTextColor) {
        for (let j in arrayTextColor[i]) {
            if (arrayTextColor[i][j] != 'ffffff' && arrayTextColor[i][j] != '000000') {
                return arrayTextColor[i][j];
            }
        }
    }

    return arrayTextColor[0][0]; //default
}

const printXml = async () => {
    const filePath = path.join(__dirname, `../uploads/semi.pptx`);
    const pre = await pptx.load(filePath);
    var arr = [[], ['dkdif', 'djhdfskj', 'pppp'], ['d85f', 'iuip']]
    var str = ''
    for (a of arr) {
        str += a.join(' ')
        str += ' '
    }

    console.log(str);
    //var xmlDataSlide = pre.getSlide(4).getSlideXmlAsString();

    //console.log(xmlDataSlide);

}
printXml();


//module.exports = { start }

