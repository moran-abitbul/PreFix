const updatePres = require('./visuals/updateVisualSlide');

const getNameUpdated = async (fileName) => {
    return await new Promise((resolve) => {
        let fileNameSave = updatePres.start(fileName);
        resolve(fileNameSave);
    })
}

module.exports = { getNameUpdated }