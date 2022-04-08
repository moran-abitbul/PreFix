const data = require('./exportDataFromPre');
const fix = require('./fixContrast');
const PPTX = require('er-nodejs-pptx');

let pptx = new PPTX.Composer();

const pre = pptx.load('format.pptx');

slide = pre.getSlide();

var xmlDataSlide = pre.getSlide(1).getSlideXmlAsString();
