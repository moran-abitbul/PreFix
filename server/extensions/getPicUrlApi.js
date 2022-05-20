const axios = require('axios')

//Get query and tbs (boost) and return url pic
const getImageFromText = (q, tbs) => {

    var api_key_Tair = 'f09834b970abc1d46e74ddcf046cb41dde0a4feef039268388ae5cd24a3d9746'
    var api_key_Moran = 'cd4b5139093c60254da1593baef560d93e06ff9fdc86777a2ac1f84d2ada9ce4'

    console.log("q: " + q + ", tbs:" + tbs);

    //tbs = ic: specific % 2Cisc: blue - specific color

    return new Promise((resolve) => {
        try {
            axios
                .get(`https://serpapi.com/search.json?engine=google&q=${q}&tbs=${tbs}&tbm=isch&num=10&api_key=${api_key_Moran}`)
                .then(res => {
                    picDataArray = res.data.images_results
                    //console.log(picDataArray);

                    resolve(res.data.images_results[0].original)

                    // titleArr = []
                    // originalArr = []

                    // //update 5 pic
                    // for (var i = 0; i < 5; i++) {
                    //     titleArr.push(picDataArray[i])
                    //     originalArr.push(picDataArray[i])
                    // }

                    //url of the pic that will added to the slide
                })
        } catch (e) {
            console.error(e.message)
        }
    })
}

// const q = "machine learning"
// const tbs = "algorithm"

// picToAdd = getPic('machine learning', 'introduction').then((img) => {
//     return img
// })

// picToAdd.then((img) => { console.log(img) })


//getImageFromText('learn comput machin', 'algorithm').then((url) => { console.log(url); })
module.exports = { getImageFromText };