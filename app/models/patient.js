// ============== app/modelstodo.js ==================================

//=========== load mongoose since we need it to define a model  ========================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var Patient = new Schema({
//     fullname :  { type : String , required : true },
//     phone :  { type : String , required : true },
//     username :  { type : String , required : true },
//       expert : Object,
//           // {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: 'Expert'
//     // },
//     image: String,
//     password :  { type : String , required : true },
//     animals :  { type : String , required : true },
//     address :  { type : String , required : true },
//     count :  { type : Number , required : true },
//     created: {
//         type: Date,
//         default: Date.now
//     }
// });

var Patient = new Schema({
    petsName :  { type : String, required : true},
    ownername :  { type : String, required : true},
    birthday :  { type : Date, required : true},
    phone :  { type : String,required : true},
    animals :  { type : String,required : true},
    password :  { type : String,required : true},
    address :  { type : String,required : true },
    username :  { type : String,required : true},
    expert : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert'
    },
    image: String,
    created: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('patient', Patient);