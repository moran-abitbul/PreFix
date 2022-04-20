const updatePres = require('./visuals/updateVisualSlide');

const getNameUpdated =  async (fileName) => {
    return await new Promise((resolve) => {
        let fileNameSave = await updatePres.start(fileName);
        console.log(fileNameSave);
        resolve(fileNameSave);
    })

}

module.exports = {getNameUpdated}
