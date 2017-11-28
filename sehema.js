var mongoose=require('mongoose');
var userschema=mongoose.Schema({
    id:{
        type:Number,
        required:true
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
        required:true
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
        type:String
    },
    timestamps:{
createdAt:Date,
updatedAt:Date
    }

    

})
console.log(userschema)
var user=mongoose.model('user',userschema);
module.exports=user;