var mongoose=require('mongoose');
var userSchema=mongoose.Schema({
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
    created_At:Date,
    updated_At:Date,
    create_date:{
        type:Date,
        default:Date.now
    }
    

})
var user=mongoose.model('User',userSchema);
module.exports=user;