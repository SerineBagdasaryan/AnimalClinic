var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Anceta = new Schema({
    vaccine_name: String,
    vaccine_date: String,
    second_vaccine_name: String,
    second_vaccine_date: String,
    disease: String,
    prescription: String,
    patient: String,

    // patient: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Patient'
    // },
});



module.exports = mongoose.model('Anceta', Anceta);