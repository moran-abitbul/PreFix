const PPTX = require('er-nodejs-pptx');
var parser = require('xml2json');
let pptx = new PPTX.Composer();


let { PptFactoryHelper } = require('../node_modules/er-nodejs-pptx/lib/helpers/ppt-factory-helper');

const func = async () => {

    // await pptx.compose(pres => {
    //     pres.addSlide(slide => {
    //         slide.addText(text => {
    //             text.value('Outline');
    //         });
    //     });
    // });

    // await pptx.save(`./hello-world.pptx`);

    const pre = await pptx.load('semi.pptx');
    xmlDataSlide = pre.getSlide(3).getSlideXmlAsString();
    console.log(xmlDataSlide)

    // const pre = await pptx.load('format.pptx');
    // console.log("load");
    // var xmlDataSlide = pre.getSlide(1).getSlideXmlAsString();
    // // xml to json
    // var dataToJson = parser.toJson(xmlDataSlide);
    // var json = JSON.parse(dataToJson);
    // console.log(xmlDataSlide);
    //var slide = pre.getSlide(1)
    //slide.backgroundColor('ffffff', 2);
    //slide.textColorToChange('0020c0')
    //     slide.textColor('FFFFFF');
    //    //slide.textColorToChange('ffffff')

    // s = json['p:sld']['p:cSld']['p:spTree']['p:sp']['p:txBody']['a:p'][0]
    // sVal = s['a:r']['a:rPr']['a:solidFill']['a:srgbClr']['val']
    // console.log(sVal);

    // p = delete s['a:r']['a:rPr']['a:solidFill']
    // s['a:r']['a:rPr']['a:solidFill'] = [PptFactoryHelper.createColorBlock('ffdbaf')];
    //p[0]['a:r']['a:rPr']['a:solidFill']['a:srgbClr'] = [PptFactoryHelper.createColorBlock('ffdbaf')]
    //console.log(p[0]['a:r']['a:rPr']['a:solidFill']['a:srgbClr'][0]);



    // delete parent that hold the val
    // await pre.save('formatSave.pptx');
    // console.log("saved");


    //     var xml = pre.getSlide(1).getSlideXmlAsString();
    //     //console.log(xml)
    //     //xml to json
    //     var data = parser.toJson(xml);
    //     var json = JSON.parse(data);


    //     //json to string
    //     //s_para = JSON.stringify(para)

    //     //array shape
    //     shape = json['p:sld']['p:cSld']['p:spTree']['p:sp']

    //     console.log(shape[0]['p:txBody']['a:p']['a:r']['a:rPr']['a:solidFill']['a:srgbClr']['val'])

    //     //create text 
    //     text = new Array();

    //     //first argu is the title
    //     text[0] = getTitle(shape)

    //     paragraphsColor = new Array();

    //     //get the paragraphs in the slide
    //     for (i = 1; i < shape.length; i++) {
    //         para = shape[i]['p:txBody']['a:p']
    //         paragraphsColor[i] = new Array();
    //         for (j = 0; j < para.length; j++) {
    //             paragraphsColor[i][j] = para[j]['a:r']['a:rPr']['a:solidFill']['a:srgbClr']['val']

    //         }
    //     }
    //    // console.log(paragraphsColor)

};


// //get the first shape on slide
// const getTitle = (json) => {
//     title = json[0]['p:txBody']['a:p']['a:r']['a:t']
//     //console.log(title)
//     return title;
// }


function setTextColor(slide, color) {
    let slideKey = `ppt/slides/${slide.name}.xml`;
    let slideContent = this.content[slideKey]['p:sld']['p:cSld'][0];

    //        console.log(slideContent['p:spTree'][0]['p:sp'][0]['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0]);

    if (slideContent['p:spTree'] !== undefined) {
        if (slideContent['p:spTree'][0]['p:sp'] === undefined) {
            slideContent['p:spTree'][0]['p:sp'] = [{}];
        } else {
            console.log(slideContent['p:spTree'][0]['p:sp']);
            for (let key in slideContent['p:spTree'][0]['p:sp'][0]['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0]) {
                if (slideContent['p:spTree'][0]['p:sp'][0]['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0].hasOwnProperty(key)) {
                    delete slideContent['p:spTree'][0]['p:sp'][0]['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0][key];
                }
            }
        }

        slideContent['p:spTree'][0]['p:sp'][0]['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0]['a:solidFill'] = [PptFactoryHelper.createColorBlock(color)];
        slideContent['p:spTree'][0]['p:sp'][0]['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0]['a:effectLst'] = [{}];
    } else {
        // The <p:bg> (background) node has to go first, but if we just insert the key and contents, it will end up after the object elements
        // once it's converted to XML. So here we must save the existing contents...
        let existingNodes = PptxContentHelper.extractNodes(slideContent); // this also deletes the nodes from slideContent

        // ...and add the <p:bg> node and existing content nodes back in.
        slideContent['p:sp'] = [{}];
        slideContent['p:sp'][0]['p:txBody'] = [{}];

        // right now we only support solid colored backgrounds (no gradient or texture fills)
        slideContent['p:sp'][0]['p:txBody']['a:p'][0]['a:r']['a:rPr']['a:solidFill'] = [PptFactoryHelper.createColorBlock(color)];
        slideContent['p:sp'][0]['p:txBody']['a:p'][0]['a:r']['a:rPr']['a:effectLst'] = [{}];

        PptxContentHelper.restoreNodes(slideContent, existingNodes);

    }
};


func();
