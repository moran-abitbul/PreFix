const axios = require('axios')

//Get query and tbs (boost) and return url pic
const getGifFromText = (q, tbs) => {

    var api_key_Tair = 'f09834b970abc1d46e74ddcf046cb41dde0a4feef039268388ae5cd24a3d9746'
    var api_key_Moran = 'cd4b5139093c60254da1593baef560d93e06ff9fdc86777a2ac1f84d2ada9ce4'

    console.log("q: " + q + ", tbs:" + tbs);

    //tbs=itp:animated for animation

    return new Promise((resolve) => {
        try {
            axios
                .get(`https://serpapi.com/search.json?engine=google&q=${q}&tbs=itp:animated&tbm=isch&num=10&api_key=${api_key_Moran}`)
                .then(res => {
                    picDataArray = res.data.images_results
                    resolve(res.data.images_results[0].original)
                })
        } catch (e) {
            console.error(e.message)
        }
    })
}

//getGifFromText('learn comput machin', 'algorithm').then((url) => { console.log(url); })
module.exports = { getGifFromText };