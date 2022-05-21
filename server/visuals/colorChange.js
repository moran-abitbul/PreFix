const ColorMath = require("color-math");
const numberToLightness = '191606'
const numberToDarken = '050505'

//darken color in 3 tones, return a new color
const Darken = (color) => {

    // newColor = ColorMath.evaluate("(#" + color + " - #" + numberToDarken + ") ").resultStr;
    let newColor = ColorMath.evaluate('#' + color + ' <<< 30%').resultStr
    try{
        return newColor.substring(1, newColor.length);
    } catch (e){
        return newColor
    }
    
};

//Lightness color in 3 tones, return a new color
const Lightness = (color) => {
    if( color == '000000'){
        color = "212121"; //Lightness black color
    }
    //let newColor = ColorMath.evaluate("(#" + color + " + #" + numberToLightness + ") ").resultStr;
    let newColor = ColorMath.evaluate('#' + color + ' >>> 30%').resultStr
    try{
        return newColor.substring(1, newColor.length);
    } catch (e){
        return newColor
    }
};

module.exports = { Darken, Lightness }

