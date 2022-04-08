const axios = require('axios');

//get data from api to test for contrast
module.exports.getData = (background, colorFount) => {
    //    console.log("get data: " + background + ", "+ colorFount);
    return new Promise((resolve) => {
        try {
            axios
                .get('https://webaim.org/resources/contrastchecker/?fcolor=' + colorFount + '&bcolor=' + background + '&api')
                .then(res => {
                    resolve(res['data'])
                })
        } catch (e) {
            console.error(e.message)
        }

    })

};