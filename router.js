var express=require('express');
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/Person')
var db=mongoose.connection;
var router=express.Router();
router.get('/user',function(req,res){
db.collection('User').find({}).toArray(function(err,result){
    if(err){
        res.send('error is occured')
    }
    else{
        res.json(result)
    }

})
})
module.exports=router;