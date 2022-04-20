const updatePres = require('./visuals/updateVisualSlide');

const func = async (fileName) => {
    let fileNameSave = await updatePres.start(fileName); 
    console.log(fileNameSave);
}
 

func('semi.pptx');
