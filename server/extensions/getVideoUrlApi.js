const axios = require('axios')

//get data from api to test for contrast
const getVideoFromText = async (search_query) => {
    var api_key = 'f09834b970abc1d46e74ddcf046cb41dde0a4feef039268388ae5cd24a3d9746'

    //sp = CAMSAhgB = < 4 min and num views
    console.log("q: " + search_query);

    axios
        .get(`https://serpapi.com/search.json?engine=youtube&search_query=${search_query}&tbm=vid&sp=CAASBBABGAE%253D&api_key=${api_key}`)
        .then(res => {
            console.log(res.data.video_results)

            var videoArr = res.data.video_results
            //console.log("before sort:" + videoLength)


            videoLength = videoArr.map(element => element.length);
            videoViews = videoArr.map(element => element.view);

            const getNumber = time => +time.replace(/:/g, '')

            //sort by length
            videoArr.sort((a, b) => {
                return getNumber(a.length) - getNumber(b.length)
            })

            //sort by views num
            videoArr.sort((a, b) => {
                return getNumber(a.views) - getNumber(b.views)
            })

            videoLength = videoArr.map(element => element.length);
            //console.log("after sort:" + videoLength)

            //resolve(res.data.video_results)
        }).catch(err => {
            console.error(err)
        })
}

//getVideoFromText('semaphore operating system')
module.exports = { getVideoFromText };
