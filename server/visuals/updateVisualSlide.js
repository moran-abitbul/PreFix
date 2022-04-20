const data = require('./exportDataFromPre');
const fix = require('./fixContrast');
var parser = require('xml2json');
const PPTX = require('er-nodejs-pptx');

let pptx = new PPTX.Composer();

const path = require('path');
const filePath = path.join(__dirname, '../uploads/example project.pptx');


const printXml = async () => {
    const pre = await pptx.load(filePath);
    // var xmlDataSlide = pre.getSlide(4).getSlideXmlAsString();
    // console.log(xmlDataSlide);
    arr = pre.getSlide(1).getArrText();
    console.log(arr[0]);
    // console.log(arr[1]);

}

printXml();

const start = async () => {
    const pre = await pptx.load('test.pptx');

    for (let i = 1; i < 4; i++) {
        console.log('start with slide - ' + i);
        var newColorText = new Array();

        //var xmlDataSlide = pre.getSlide(i).getSlideXmlAsString();
        // xml to json
        // var dataToJson = parser.toJson(xmlDataSlide);
        // var json = JSON.parse(dataToJson);

        //backgroundColor = data.extractBackgroundColor(json);
        //console.log("background color: " + backgroundColor);

        backgroundColor = pre.getSlide(i).getBackgroundColor();
        // console.log("background color: " + backgroundColor);

        colorText = pre.getSlide(i).getArrColors();
        //console.log(colorText);

        // colorText = data.getArrayOfColorPara(json)
        // console.log("color text: " + colorText);

        shapeTextArray = pre.getSlide(i).getArrText();
        //console.log(shapeTextArray);

        // textArray = data.getArrayOfTextPara(json);
        // console.log("text array: " + textArray);

        //update the background color with the first text
        updateBackground = await fix.checkContrast(backgroundColor, colorText[0][0]).then(array => {
            return array[0]; //colorbackground and text first
        });
        //console.log("updateBackground: " + updateBackground);

        //if there more then 1 color of text
        for (let j = 0; j < colorText.length; j++) { //num of shape
            newColorText[j] = new Array();
            for (let k = 0; k < colorText[j].length; k++) { //num of row text in one shape
                // console.log("before: colorText[" + j + k + "] " + colorText[j][k]);
                await fix.textContrast(updateBackground, colorText[j][k]).then(colorText => {
                    //console.log("after contrast colorText: " + colorText);
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
            // console.log("i: " + i);
            for (let j = 0; j < newColorText[i].length; j++) { //index for row in 
                // console.log("j: " + j);
                // console.log(" color to change: " + newColorText[i][j]);
                slide_i.textColorToChange(newColorText[i][j], i, j);
            }
        }

    }

    pre.save('testSave.pptx');
    console.log("saved");


}

//start();

