var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Centre = new Schema({
    centreName:{ type : String , required : true },
    centreOwnerName:{type:String,required:true},
    centreEmail:{type:String,required:true},
    centreOwnerEmail:{type:String,required:true},
    centrePassword:{type:String,required:true},
    centreAddress:{type:String,required:true},
    centrePphone:{type:String,required:true},
    centreOwnerPphone:{type:String,required:true},
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// Centre.plugin(passportLocalMongoose);

module.exports = mongoose.model('Centre', Centre);