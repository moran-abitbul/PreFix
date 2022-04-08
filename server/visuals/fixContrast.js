const color = require('./getDataColor');
const lightness = require('./lightness');

//check the contrast with the data from api and lightness if we need

numberToLightness = "030303"

const checkContrast = async (background, colorFount) => {
    const dataJson = await color.getData(background, colorFount); //accept data from api contrast
    ratio = dataJson['ratio'];
    return await new Promise((resolve) => {
        if (ratio < 4.72) {
            newBackground = lightness.Lightness(background,numberToLightness)
            //   console.log("ratio: " + ratio + "Ncolor: "+ newBackground)
            resolve(checkContrast(newBackground, colorFount)); //rec until the ratio is ok
        } else {
            resolve(background);
        }
    });
}


exports.checkContrast = checkContrast;
