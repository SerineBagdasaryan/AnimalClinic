// ============== app/modelsexpert.js ==================================

//=========== load mongoose since we need it to define a model  ========================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Expert = new Schema({
    firstname: { type : String, required : true},
    lastname :{ type : String, required : true},
    username:{ type : String, required : true},
    password:{ type : String, required : true,unique: true},
    address:{ type : String, required : true},
    cell:{ type : Number, required : true},
    phone:{ type : Number, required : true},
    profession:{ type : String, required : true},
    centre: {
        type: mongoose.Schema.Types.ObjectId, required : true,
        ref: 'Centre'
    },
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('expert', Expert);


