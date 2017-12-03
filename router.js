var express=require('express');
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/Person')
var User=require('./schema')
var db=mongoose.connection;
var router=express.Router();
router.get('/user',function(req,res){
db.collection('User').find({}).toArray(function(err,result){
    if(err){
        res.json({msg:'error is ocupied'})
    }
    else{
        res.json(result)
    }
})
})
router.post('/', function(req, res, next) {
   db.collection('User').insert(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  })


module.exports=router;