const picArray = require('./picAPI');

//insert req to the func
async function getArray(fileName) {

    return await new Promise((resolve) => {
        getFileNameArray().then(resFileName => {
            resolve(resFileName);
        })
    })

    //return array of the filename
    async function getFileNameArray() {
        return await new Promise((resolve) => {
            getArrayOfPic().then(resOfPic => {
                fileNameArray = resOfPic.map(element => element.filename);
                resolve(fileNameArray);
            })
        })
    }

    async function getArrayOfPic() {
        return await new Promise((resolve) => {
            filesArr = picArray.output(fileName).then((output => {
                resolve(output)
            }));
        })
    }
}

module.exports = { getArray };