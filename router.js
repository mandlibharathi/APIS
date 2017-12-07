var express=require('express');
var router=express.Router();
var user=require('./schema');
router.get('/signup',function(req,res){
    user.find({},function(err,result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }
    })
    
})
router.post('/signup',function(req,res){
    var id=req.body.id;
    var phone=req.body.phone;
    var email=req.body.email;
    var role=req.body.role;
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var countryCode=req.body.countryCode;
    var user1=new user()
    user1.id=id;
    user1.phone=phone;
    user1.email=email;
    user1.firstname=firstname;
    user1.lastname=lastname;
    user1.countryCode=countryCode;
    user1.save(function(err,savedUser){
        if(err){
            console.log(err);
            return res.status(500).send()

        }
        else{
res.status(200).send(savedUser)
        }
    })
})

    module.exports=router;