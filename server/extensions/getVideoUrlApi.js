const axios = require('axios')

//get data from api to test for contrast
const getVideoFromText = async (search_query) => {
    var api_key = 'f09834b970abc1d46e74ddcf046cb41dde0a4feef039268388ae5cd24a3d9746'

    //sp = CAMSAhgB = < 4 min and num views
    console.log("q: " + search_query);

    return new Promise((resolve) => {
        try {
            axios
                .get(`https://serpapi.com/search.json?engine=youtube&search_query=${search_query}&tbm=vid&sp=CAASBBABGAE%253D&api_key=${api_key}`)
                .then(res => {
                    // console.log(res.data.video_results)

                    var videoArr = res.data.video_results
                    //console.log("before sort:" + videoLength)


                    const getNumber = time => +time.replace(/:/g, '')

                    //sort by length
                    videoArr.sort((a, b) => {

                        let a_floatNuumber = parseFloat(a.length);
                        let b_floatNuumber = parseFloat(b.length);

                        // console.log("time: " + (a_floatNuumber - b_floatNuumber));

                        // return getNumber(a.length) - getNumber(b.length)
                        return (a_floatNuumber - b_floatNuumber);
                    })

                    videoLength = videoArr.map(element => element.length);
                    console.log("after sort Length:" + videoLength)

                    var arrTopVideoLength = []

                    for (var i = 0; i < videoLength.length; i++) {
                        let time = videoLength[i].replace(':', '.')
                        if (time >= 0.15 && time < 1) {
                            arrTopVideoLength.push(videoArr[i])
                        }

                    }
                    console.log("arrTopVideoLength ---> ");
                    console.log(arrTopVideoLength);

                    //sort by views num
                    arrTopVideoLength.sort((a, b) => {
                        let a_floatNuumber = parseFloat(a.views);
                        let b_floatNuumber = parseFloat(b.views);
                        //  return getNumber(a.views) - getNumber(b.views)
                        return (a_floatNuumber - b_floatNuumber);
                    })
                    videoViews = arrTopVideoLength.map(element => element.views);
                    console.log("after sort Views:" + videoViews)
                    console.log(arrTopVideoLength[videoViews.length - 1]);

                    resolve(arrTopVideoLength[videoViews.length - 1])
                })
        } catch (err) {
            console.error(err)
        }
    })
}




//getVideoFromText('semaphore operating system')
module.exports = { getVideoFromText };
