const updatePres = require('./visuals/updateVisualSlide');

//get the file name after change and start all the process
const getNameUpdated = async (fileName) => {
    return await new Promise((resolve) => {
        let fileNameSave = updatePres.start(fileName);
        resolve(fileNameSave);
    })
}

module.exports = { getNameUpdated }