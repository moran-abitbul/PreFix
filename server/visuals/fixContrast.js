const color = require('./getDataColor');
//const lightness = require('./lightness');
const changeColor = require('./colorChange');
colorArr = new Array();

//check the contrast with the data from api and lightness if we need
const checkContrast = async (background, textColor) => {
    console.log("get colors: " +  " background: " + background + " textColor: " + textColor);
    let dataJson = await color.getData(background, textColor); //accept data from api contrast
    let ratio = dataJson['ratio'];
    return await new Promise((resolve) => {
        if (ratio < 4.63) {
            let newBackground = changeColor.Darken(background);
            let newTextColor = changeColor.Lightness(textColor);
            if (background == newBackground) {
                colorArr[0] = background;
                colorArr[1] = textColor;
                resolve(colorArr);
            }
            if (ratio < 1) { newTextColor = "FFFFFF" }
            console.log("ratio: " + ratio + " Ncolor: " + newBackground + " Tcolor: " + newTextColor);
            resolve(checkContrast(newBackground, newTextColor)); //rec until the ratio is ok
        } else {
            colorArr[0] = background;
            colorArr[1] = textColor;
            resolve(colorArr);
        }
    });
}

const textContrast = async (backgroundT, textColorT) => {
    if (backgroundT == null || textColorT == null) { return; }
    var dataJsonT = await color.getData(backgroundT, textColorT); //accept data from api contrast
    var ratioT = dataJsonT['ratio'];
    return await new Promise((resolve) => {
        if (ratioT < 4.63) {
            if (ratioT <= 1) {
                if (backgroundT != 'ffffff') {
                    textColorT = "FFFFFF"
                } else
                    textColorT = "000000"
            } else
                textColorT = changeColor.Lightness(textColorT);

            resolve(textContrast(backgroundT, textColorT)); //rec until the ratio is ok
        } else {
            resolve(textColorT);
        }
    });
}


module.exports = { checkContrast, textContrast }
