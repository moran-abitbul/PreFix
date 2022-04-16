const PPTX = require('er-nodejs-pptx');
var parser = require('xml2json');
const fix = require('./fixContrast');
let pptx = new PPTX.Composer();

const func = async (slide) => {
    //const pre = await pptx.load("format.pptx");

    //var xmlDataSlide = pre.getSlide(2).getSlideXmlAsString();
    // var xmlDataSlide = slide.getSlideXmlAsString();
    // // xml to json
    // var data = parser.toJson(xmlDataSlide);
    // var json = JSON.parse(data);

    // backgroundColor = extractBackgroundColor(json);
    // console.log("background color: " + backgroundColor);

    // colorText = getArrayOfColorPara(json)
    // console.log("color text: " + colorText);

    // textArray = getArrayOfTextPara(json);
    // console.log("text array: " + textArray);

    // //update color 
    // newColorBackground = await fix.checkContrast(backgroundColor, colorText[0]).then(color => {
    //     return color;
    // })

    // arr = await fix.checkContrast(backgroundColor, colorText[0]).then(array => {
    //     console.log(array);
    //     return array;
    //  });

    // // change slide
    // var slide1 = pre.getSlide(2);
    // slide1.backgroundColor(arr[0]);
    // slide1.textColor(arr[1]);


    // await pre.save('formatSave.pptx');
    // console.log("saved");
}


const extractBackgroundColor = (json) => {
    try {
        //extract background color
        backgroundColor = json['p:sld']['p:cSld']['p:bg']['p:bgPr']['a:solidFill']['a:srgbClr']['val'];
        //console.log(backgroundColor)
        return backgroundColor;
    } catch (e) {
        return 'ffffff';
    }

}

const getArrayOfTextPara = (json) => {
    //array shape
    shape = json['p:sld']['p:cSld']['p:spTree']['p:sp']
    //create text 
    text = new Array();

    //first argu is the title
    text[0] = getTitle(shape)

    //get the paragraphs in the slide
    for (i = 1; i < shape.length; i++) {
        para = shape[i]['p:txBody']['a:p']
        text[i] = ""
        for (j = 0; j < para.length; j++) {
            text[i] += para[j]['a:r']['a:t']
        }
    }
    return text
}

//get the first shape on slide
const getTitle = (json) => {
    title = json[0]['p:txBody']['a:p']['a:r']['a:t']
    //console.log(title)
    return title;
}

const getArrayOfColorPara = (json) => {
    //array shape
    shape = json['p:sld']['p:cSld']['p:spTree']['p:sp']
    paragraphsColor = new Array();
    //color title
    console.log("print: " + shape[0]['p:txBody']['a:p']);
    paragraphsColor[0] = shape[0]['p:txBody']['a:p']['a:r']['a:rPr']['a:solidFill']['a:srgbClr']['val']
    //color para
    for (i = 1; i < shape.length; i++) {
        para = shape[i]['p:txBody']['a:p']
        paragraphsColor[i] = new Array();
        for (j = 0; j < para.length; j++) {
            paragraphsColor[i][j] = para[j]['a:r']['a:rPr']['a:solidFill']['a:srgbClr']['val']
        }
    }
    return paragraphsColor;
}

module.exports = { extractBackgroundColor, getTitle, getArrayOfColorPara, getArrayOfTextPara }