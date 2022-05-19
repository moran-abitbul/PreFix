const color = require('./getDataColor');
//const lightness = require('./lightness');
const changeColor = require('./colorChange');
colorArr = new Array();

//check the contrast with the data from api and lightness if we need
const checkContrast = async (background, textColor) => {
    console.log("get colors: " + " background: " + background + " textColor: " + textColor);
    let dataJson = await color.getData(background, textColor); //accept data from api contrast
    let ratio = dataJson['ratio'];
    return await new Promise((resolve) => {
        if (ratio < 7.1) {
            // let newBackground = changeColor.Darken(background);
            // let newTextColor = changeColor.Lightness(textColor);
            let newBackground = changeColor.Lightness(background);
            let newTextColor = changeColor.Darken(textColor);
            if (background == newBackground) {
                colorArr[0] = background;
                colorArr[1] = textColor;
                resolve(colorArr);
            }
            if (ratio < 1) { newTextColor = "FFFFFF" }
            //console.log("ratio: " + ratio + " Ncolor: " + newBackground + " Tcolor: " + newTextColor);
            resolve(checkContrast(newBackground, newTextColor)); //rec until the ratio is ok
        } else {
            //console.log("good (else) ratio: " + ratio + " Bcolor: " + background + " Tcolor: " + textColor);
            colorArr[0] = background;
            colorArr[1] = textColor;
            resolve(colorArr);
        }
    });
}

const ratioContrast = async (background, textColor) => {
    console.log("ratioContrast - get colors: " + " background: " + background + " textColor: " + textColor);
    let dataJson = await color.getData(background, textColor); //accept data from api contrast
    let ratio = dataJson['ratio'];
    return await new Promise((resolve) => {
        resolve(ratio);

    })

}
const textContrast = async (backgroundT, textColorT) => {
    if (backgroundT == null || textColorT == null) { return; }
    var dataJsonT = await color.getData(backgroundT, textColorT); //accept data from api contrast
    var ratioT = dataJsonT['ratio'];
    console.log("textContrast - get colors: " + " background: " + backgroundT + " textColor: " + textColorT);
    return await new Promise((resolve) => {
        // letconsole.log("text contrast-->  ratio: " + ratioT + " Bcolor: " + backgroundT + " Tcolor: " + textColorT);
        if (ratioT < 7) {
            if (ratioT <= 1) {
                if (backgroundT != 'ffffff') {
                    textColorT = "FFFFFF"
                } else
                    textColorT = "000000"
            } else
                textColorT = changeColor.Darken(textColorT);

            resolve(textContrast(backgroundT, textColorT)); //rec until the ratio is ok
        } else {
            resolve(textColorT);
        }
    });
}


module.exports = { checkContrast, textContrast, ratioContrast }
