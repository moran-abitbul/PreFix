const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("f09834b970abc1d46e74ddcf046cb41dde0a4feef039268388ae5cd24a3d9746");

const params = {
    q: "Apple",
    tbm: "isch",
    ijn: "0"
};

const callback = function (data) {
    console.log(data['images_results']);
};

// Show result as JSON
search.json(params, callback);



// axios
//     .get('https://webaim.org/resources/contrastchecker/?fcolor=666666&bcolor=FFFFFF&api')
//     .then(res => {
//         console.log(res);
//     })
//     .catch(error => {
//         console.error(error)
//     }); 