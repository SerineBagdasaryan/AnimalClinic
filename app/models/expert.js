// ============== app/modelsexpert.js ==================================

//=========== load mongoose since we need it to define a model  ========================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Expert = new Schema({
    firstname: String,
    lastname :String,
    username:String,
    password:String,
    workPlace:String,
    address:String,
    cell:Number,
    phone:Number,
    proffession:String,
    centre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Centre'
    },
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('expert', Expert);


