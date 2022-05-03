const getImgUrlFunc = require('./getPicUrl')

// Who is run this function will use than
//Wrapper function, get text and title and return image url
const getPic = async (text, title) => {
    var img = await getImgUrlFunc.getPicFromText(text, title).then((imgUrl) => {
        return imgUrl;
    })
    return new Promise((resolve) => {
        resolve(img)
    })
}

//const text = 'Machine Learning: Allow the computer to learn from examples. Runs on a variety of computational tasks where classic programming is not possible.'
const title = 'introduction'
const text = 'In computer science, merge sort (also commonly spelled as mergesort) is an efficient, general-purpose, and comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide-and-conquer algorithm that was invented by John von Neumann in 1945'

getPic(text, title).then((data) => { console.log(data) })

// module.exports = { getPic }