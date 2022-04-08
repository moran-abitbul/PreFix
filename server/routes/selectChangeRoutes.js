const express = require('express');
const router = express.Router()

router.use(function (req, res, next) {
    console.log(req.url, "@", Date.now());
    next()
});


router.
    route('/') // Home = selectChange
    .get((req, res) => {
        //res.json({ name: "Tair" });
        console.log('get request from browser' + req.url)

        res.status(200).json({ massage: "Send array of slides to the browser", status: 200 });
    });


module.exports = router;