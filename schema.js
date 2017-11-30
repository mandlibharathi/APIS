var mongoose=require('mongoose');
var UserSchema=mongoose.Schema({
    id:{
        type:Object,
    },
   phone:{
        type:Number,
        required:true,
        unique:true

    },
   email:{
        type:Number,
        required:true,
        unique:true
    },
   role:{
        type:String,
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    countryCode:{
        type:Number
    },
   time:{
       type:Date,
       default:Date.now
   }
    

})
module.exports=mongoose.model('User',UserSchema)