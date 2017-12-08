var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    id:{
        type:Number

    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
    type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    countryCode:{
        type:Number
    },
    timestamps:{
        created_At:Date,
        Updated_At:Date
    }
   
})
module.exports=mongoose.model('User',userSchema)
