const getImgFunc = require('./getImageFromTxt')

// const q = "machine learning"
// const tbs = "algorithm"

const getPic = async (q, tbs) => {
    var img = await getImgFunc.getImageFromText(q, tbs).then((imgUrl) => {
        return imgUrl;
    })

    return new Promise((resolve) => {
        resolve(img)
    })
}

// picToAdd = getPic('machine learning', 'introduction').then((img) => {
//     return img
// })

// picToAdd.then((img) => { console.log(img) })

module.exports = { getPic }