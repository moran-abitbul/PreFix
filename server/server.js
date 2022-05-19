const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create application
const app = express();

//db
const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('PREFIXDB.dbConfig.dbName');

//connect to mongodb
mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database successfully connected')
}).catch(err => {
    console.log('Database could not connected' + err)
})

//routers
//const selectChangeRoutes = require('./routes/selectChangeRoutes');
const fileUploaderRoutes = require('./routes/fileUploaderRoutes');
const showChangeRoutes = require('./routes/showChangeRoutes')
const downloadFileRouter = require('./routes/downloadFileRouter')

//use
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use('/upload', fileUploaderRoutes);
//app.use('/upload/selectChange', selectChangeRoutes);
app.use('/showChange', showChangeRoutes);
app.use('/downloadFile', downloadFileRouter);


// Server listen   
app.listen(8000, () => {
    console.log('App is running on port 8000')
});



app.get("/", (req, res) => {
    //handle root
    res.render("hello root");
});