var mongoose=require('mongoose');
var userschema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
   phone:{
        type:Number,
        required:true

    },
   email:{
        type:Number,
        required:true
    },
   role:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }

})
var user=mongoose.model('user',userschema)
module.exports.getuser=function(){
};