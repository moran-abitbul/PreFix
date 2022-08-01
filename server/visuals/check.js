const largestSum = (numbers) => {

    //break point
    if (numbers.length == 0) {
        return 0
    }

    listA = remove2elem(numbers)//remove the first two elements
    listB = remove1elem(numbers)//remove the first element

    sum1 = numbers[0] + largestSum(listA)
    sum2 = largestSum(listB)

    var largeSum = sum1 > sum2 ? sum1 : sum2
    return largeSum
}

//remove the first element
const remove1elem = (numbers) => {
    list = []
    for (let i = 1; i < numbers.length; i++) {
        list.push(numbers[i])
    }
    return list
}

//remove the first two elements
const remove2elem = (numbers) => {
    list = []
    for (let i = 2; i < numbers.length; i++) {
        list.push(numbers[i])
    }
    return list
}

//sum = largestSum([2, 4, 6, 2, 5])
//sum = largestSum([5, 1, 1, 5])
//console.log(sum)


// bg = '000000'
// newBg = 'ffffff'

// var colorMap = new Map();
// colorMap.set(bg, newBg);

// if (!colorMap.has(bg)) {

//     console.log('this color not exist in the map')
// }
// else {
//     //use this color
//     console.log(colorMap.get(bg))
// }

//console.log(colorMap)
//console.log(colorMap.has('000000'))




// beginning


const fix = require('./fixContrast');
const PPTX = require('er-nodejs-pptx');
const path = require('path');
const getPicFile = require('../extensions/getPicUrl')
const getVideoFile = require('../extensions/getVideoUrl')
const checkValid = require('./checkValidTextSlide')
const changeString = require('./changeStringToBullet')

//for json file - match color 
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
var fs = require('fs');


let pptx = new PPTX.Composer();

const start = async (fileName) => {

    const filePath = path.join(__dirname, `../uploads/${fileName}`);
    const fileSaveName = `updated-${fileName}`;
    const fileSavePath = path.join(__dirname, `../uploads/${fileSaveName}`);

    const pre = await pptx.load(filePath);

    const slidesNum = pre.presentation.content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].length;
    var counterWithoutPic = 0;

    //text of all the slides 
    const slidesText = new Array();

    //go through all the slides 
    for (let i = 5; i < slidesNum + 1; i++) {
        //for (let i = 1; i < 2; i++) {

        console.log('start with slide - ' + i);
        var newColorText = new Array();

        var withPic = pre.getSlide(i).checkPic();
        if (!withPic) { counterWithoutPic++; } //count for slides without pic

        //without first slide
        if (i != 1) {
            //fix the sentences //array of shape that each index is an array of the sentences
            var textArray = pre.getSlide(i).getArrText(); //textArray[0] --> string, textArray[1] --> properties
            var isAValidText = checkValid.checkValidText(textArray)

            //get text of slide
            var slideText = '' //create string for get pic 
            //for (text of textArray[0]) {    
            // slideText += text.join(' ')
            // slideText += ' '
            //}         

            for (textIndex in textArray[0]) {
                if (textIndex != 0) {
                    slideText += textArray[0][textIndex].join(' ')
                    slideText += ' '
                }
            }

            //add slide text to array of slides
            slidesText.push(slideText)

            //change the text if it not valid  
            if (!isAValidText) {
                var newTextArray = changeString.changeText(textArray)
                pre.getSlide(i).setArrText(newTextArray, textArray[1]);
            }

            //get title of the slide
            var slideTitle = '' //title of this slide
            if (typeof (textArray[0][0][0]) == 'object') {
                slideTitle = textArray[0][0][0][0]
            }
            else if (typeof (textArray[0][0][0]) == 'strings') {
                slideTitle = textArray[0][0][0]
            }
        }

        //add pic to the slide
        if (counterWithoutPic == 3) {
            //get pic url from API
            //bag of word to the slide text-> get freq word -> googleSearch API -> get urlPic
            // var picUrl = await getPicFile.getPicFromText(slideText, slideTitle).then((url) => {
            //     return (url.toString('utf8'))
            // })
            //console.log("picUrl --> " + picUrl);

            var picUrl = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/Semaphores_1.png"
            //add picture to the slide
            await pre.getSlide(i).addImage({
                src: picUrl,
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
        console.log('original color text:');
        console.log(colorText);

        let valColorText = await getValColor(backgroundColor, colorText);
        //console.log(valColorText);

        var updateBackground = ''
        //check if there is a match for this color
        await checkMatchColor(backgroundColor).then(async (matchColor) => {
            console.log('matchColor of bg --> ' + matchColor);
            if (matchColor == -1) {
                //update the background color 
                updateBackground = await fix.checkContrast(backgroundColor, valColorText).then(array => {
                    return array[0]; //colorbackground and text first
                });
                //to insert colors to json file
                var obj = {
                    table: []
                };
                obj.table.push({ color: backgroundColor, matchColor: updateBackground });
                var json = JSON.stringify(obj);
                fs.writeFile('colors.json', json, (err) => { if (err) { console.error(err); return; } })
            } else {
                updateBackground = matchColor
            }
        });

        console.log("updateBackground: " + updateBackground);

        // create new color text for update the slide
        //if there more then 1 color of text
        for (let j = 0; j < colorText.length; j++) { //num of shape
            newColorText[j] = new Array();
            for (let k = 0; k < colorText[j].length; k++) { //num of row text in one shape

                await checkMatchColor(colorText[j][k]).then(async (matchColor) => {
                    console.log('length of j:' + colorText[j].length);
                    console.log('colorText j k --> ' + colorText[j][k]);

                    console.log('matchColor of txt--> ' + matchColor);
                    if (matchColor == -1) {
                        await fix.textContrast(updateBackground, colorText[j][k]).then(colorText => {
                            newColorText[j].push(colorText)
                            //to insert colors to json file
                            var obj = {
                                table: []
                            };
                            obj.table.push({ color: colorText[j][k], matchColor: colorText });
                            var json = JSON.stringify(obj);
                            fs.writeFile('colors.json', json, (err) => { if (err) { console.error(err); return; } })
                        });
                    } else {
                        console.log('in else- yes match color')
                        newColorText[j].push(matchColor)
                    }
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

    // add video to the last slide and offers more videos to the client
    // let videoUrl = await getVideoUrl(slidesText).then(url => {
    //     return url
    // });

    //console.log("videoUrl ---> " + videoUrl);

    pre.save(fileSavePath);
    console.log("saved");

    return fileSaveName;
}

const getVideoUrl = async (slidesText) => {
    console.log("getVideoUrl, text: ");
    console.log(slidesText.toString());
    text = slidesText.toString()
    return new Promise(async (resolve) => {
        await getVideoFile.getVideoFromText(text).then((url) => {
            // console.log("res url video: ");
            // console.log(url.toString('utf8'));
            resolve(url.toString('utf8'))
        })
    })

}

//get the text color value with the lowest ratio (with the backgroundColor)
const getValColor = async (backgroundColor, colorText) => {
    //min contrast
    var tempColorText = null
    var currentRatio = 1000;
    for (paraColor of colorText) {
        for (let runText in paraColor) {
            await fix.ratioContrast(backgroundColor, paraColor[runText]).then(ratio => {
                if (ratio <= currentRatio) {
                    tempColorText = paraColor[runText]
                    currentRatio = ratio
                }
            })
        }
    }

    return tempColorText
}

const checkMatchColor = async (color) => {
    return new Promise((resolve, reject) => {

        //if the color is exist- get the match color
        fs.readFile('colors.json', 'utf8', (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            var jsonData = JSON.parse(data);
            //console.log(jsonData['table'][0]['color']);

            $(jsonData['table']).filter(function (index, item) {
                if (item.color == color) {
                    console.log(item.matchColor);
                    resolve(item.matchColor)
                }
            });
            resolve(-1);
        })
    })
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

text = 'Machine Learning: Allow the computer to learn from examples, Runs on a variety of computational tasks where classic programming is not possible. Supervised Learning. Unsupervised Learning. Reinforcement Learning. ',
    'Data Set: Data For Learning, Examples - with or without “results”. Occam’s Razor: prefer a simple model if possible. ',
    'Machine Learning Text Mining Learning Algorithm Text mining for market prediction Conclusions ',
    'Technology development. Documents go digital: Need to search for information digitally. Strong field, a lot of money, very popular. ',
    'Generalize to new examples: The ability of the model to properly adapt to previously unseen data. Dimensionality Reduction: Data from a high-dimensional space into a low-dimensional. NLP – Natural Language Processing. '

const getVideoUrlT = (slidesText) => {
    console.log("getVideoUrl, text: ");
    console.log(slidesText);
    getVideoFile.getVideoFromText(slidesText).then((url) => {
        console.log("url video: ");
        console.log(url);
        console.log("res url video: ");
        console.log(url.toString('utf8'));
        return (url.toString('utf8'))
    })
}

//getVideoUrlT(text)

start("test.pptx");
//module.exports = { start }




