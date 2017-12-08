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
    var newuser=new user();
    newuser.id=id;
    newuser.phone=phone;
    newuser.email=email;
    newuser.role=role;  
    newuser.firstname=firstname;
    newuser.lastname=lastname;
    newuser.countryCode=countryCode;
    user.findOne({$or:[{'phone':phone},{'email':email}]},function(err,user){
        if(err){
        res.send(err)
        }
        if(user){
            res.json({msg:'email / phone already taken'})
        }
        else {
            newuser.save(function(err,savedfile){
                if(err){
                    res.staus(500).send()
                }
                else{
                    res.status(200).send(savedfile)
                }
            })
        }
    })

})

 module.exports=router;                                                                                                                                               