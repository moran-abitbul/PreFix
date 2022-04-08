const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PresentationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        data: Buffer,
        contentType: String
    }
});

//presentation = collection name in mongodb
module.exports = mongoose.model('presentation', PresentationSchema);