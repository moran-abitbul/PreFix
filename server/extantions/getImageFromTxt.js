const axios = require('axios')

const getImageFromText = (q, tbs) => {

    var api_key = 'f09834b970abc1d46e74ddcf046cb41dde0a4feef039268388ae5cd24a3d9746'

    console.log("q: " + q + ", tbs:" + tbs);

    return new Promise((resolve) => {
        try {
            axios
                .get(`https://serpapi.com/search.json?engine=google&q=${q}&tbs=${tbs}&tbm=isch&num=10&api_key=${api_key}`)
                .then(res => {
                    picDataArray = res.data.images_results
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

//getImageFromText('data learn exampl', 'Data Set').then((url) => { console.log(url); })
module.exports = { getImageFromText };


// const SerpApi = require('google-search-results-nodejs');
// const search = new SerpApi.GoogleSearch("f09834b970abc1d46e74ddcf046cb41dde0a4feef039268388ae5cd24a3d9746");


// const params = {
//     q: "machine learning",
//     tbm: "isch",
//     ijn: "0",
//     tbs: "algorithm",
//     engine: "google",
//     google_domain: "google.com",
//     lr: "lang_iw|lang_en",
//     num: "10"
// };

// const callback = function (data) {
//     console.log(data['images_results'][0]);
// };

// // Show result as JSON
// search.json(params, callback);









