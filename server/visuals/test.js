const PPTX = require('er-nodejs-pptx');
var parser = require('xml2json');
let pptx = new PPTX.Composer();

const func = async () => {
    const pre = await pptx.load('format.pptx');
    console.log("load");

    var xml = pre.getSlide(1).getSlideXmlAsString();
    //console.log(xml)
    //xml to json
    var data = parser.toJson(xml);
    var json = JSON.parse(data);
    

    //json to string
    //s_para = JSON.stringify(para)

    //array shape
    shape = json['p:sld']['p:cSld']['p:spTree']['p:sp']

    console.log(shape[0]['p:txBody']['a:p']['a:r']['a:rPr']['a:solidFill']['a:srgbClr']['val'])

    //create text 
    text = new Array();

    //first argu is the title
    text[0] = getTitle(shape)

    paragraphsColor = new Array();

    //get the paragraphs in the slide
    for (i = 1; i < shape.length; i++) {
        para = shape[i]['p:txBody']['a:p']
        paragraphsColor[i] = new Array();
        for (j = 0; j < para.length; j++) {
            paragraphsColor[i][j] = para[j]['a:r']['a:rPr']['a:solidFill']['a:srgbClr']['val']

        }
    }
   // console.log(paragraphsColor)

}


//get the first shape on slide
const getTitle = (json) => {
    title = json[0]['p:txBody']['a:p']['a:r']['a:t']
    //console.log(title)
    return title;
}

func();