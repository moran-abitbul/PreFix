const ColorMath = require("color-math");

//Brightens color in 3 tones, return a new color

const Lightness = (color, number) => {

    let newColor = ColorMath.evaluate("(#" + color + " + #" + number + ") ").resultStr;
    return newColor.substring(1, newColor.length);
};

exports.Lightness = Lightness;
