const fix = require('./fixContrast');
const PPTX = require('er-nodejs-pptx');
const path = require('path');
const extantion = require('../extantions/getPicUrl')
const checkValid = require('./checkValidTextSlide')
const changeString = require('./changeStringToBullet')

let pptx = new PPTX.Composer();

const start = async (fileName) => {

    const filePath = path.join(__dirname, `../uploads/${fileName}`);
    const fileSaveName = `updated-${fileName}`;
    const fileSavePath = path.join(__dirname, `../uploads/${fileSaveName}`);

    const pre = await pptx.load(filePath);

    //go through all the slides
    for (let i = 3; i < 4; i++) {
        console.log('start with slide - ' + i);
        var newColorText = new Array();
        var counterWithoutPic = 0;

        var withPic = pre.getSlide(i).checkPic();
        if (!withPic) { counterWithoutPic++; } //count for slides without pic

        //without firs slide
        if (i != 1) {
            //fix the sentences //array of shape that each index is an array of the sentences
            var textArray = pre.getSlide(i).getArrText(); //textArray[0] --> string, textArray[1] --> properties
            var isAValidText = checkValid.checkValidText(textArray)

            //change the text if it not valid  
            if (!isAValidText) {
                var newTextArray = changeString.changeText(textArray)
                pre.getSlide(i).setArrText(newTextArray, textArray[1]);
            }
        }

        //add pic to slide
        if (counterWithoutPic == 3) {
            var textSlide = '' //create string for get pic
            for (text of textArray[0]) {
                textSlide += text.join(' ')
            }

            //get pic url from API
            picUrl = extantion.getPicFromText(textSlide, 'title').then((url) => {
                return (url.toString('utf8'))
            })
            await pre.getSlide(1).addImage({
                //src: picUrl
                src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/Semaphores_1.png',
                x: 600,
                y: 310,
                cx: 350,
            });

            counterWithoutPic = 0;
        }

        //original background color
        let backgroundColor = pre.getSlide(i).getBackgroundColor();
        console.log("background color: " + backgroundColor);

        //array of shape that each index is an array of original colors of the sentences
        let colorText = pre.getSlide(i).getArrColors();
        //console.log(colorText);

        let valColorText = getValColor(colorText);

        //update the background color 
        let updateBackground = await fix.checkContrast(backgroundColor, valColorText).then(array => {
            return array[0]; //colorbackground and text first
        });
        console.log("updateBackground: " + updateBackground);

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
        let slide_i = pre.getSlide(i);
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
            t = typeof arrayTextColor[i];
            if (typeof arrayTextColor[i] === 'object')
                if (arrayTextColor[i][j] != 'ffffff' && arrayTextColor[i][j] != '000000') {
                    return arrayTextColor[i][j];
                }
        }
    }

    return arrayTextColor[0][0]; //default
}

const printXml = async () => {
    const filePath = path.join(__dirname, `../uploads/check.pptx`);
    const pre = await pptx.load(filePath);
    await pre.getSlide(1).addImage({
        src: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/Semaphores_1.png',
        x: 600,
        y: 310,
        cx: 350,
    });
    // var xmlDataSlide = pre.getSlide(5).getSlideXmlAsString();

    //console.log(xmlDataSlide);
    // const fileSavePath = path.join(__dirname, `../uploads/semiSave.pptx`);
    // pre.save(fileSavePath);
    // console.log("saved");
}
//printXml();

start("check.pptx");
//module.exports = { start }

