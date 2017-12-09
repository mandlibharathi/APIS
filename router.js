var express=require('express');
var router=express.Router();
var User=require('./schema');
var jwt=require('jsonwebtoken');
router.get('/signup',function(req,res){
    User.find({},function(err,result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result)
        }
    })
})
router.post('/login',function(req,res){
     var phone=req.body.phone;
    var email=req.body.email;
    var password=req.body.password;
    User.findOne({$or:[{'phone':phone},{'email':email}]},function(err,user){
        if(err){
            res.send(err)
        }
        if(!user){
            res.json({sucess:false,msg:"user cannot find"})
        }
        else if(user){
            if(user.password!=req.body.password){
                res.json({sucess:false,msg:'wrong pasword'})
            }
            else{
                var secret='supersecret';
           var token=jwt.sign({id:user._id},secret) 
        res.status(200).send({auth:true,token:token})
            }
        }
        
    })
})

router.post('/signup',function(req,res){
    var id=req.body.id;
    var phone=req.body.phone;
    var email=req.body.email;
    var password=req.body.password;
    var role=req.body.role;
    var firstname=req.body.firstname;
     var lastname=req.body.lastname;
    var countryCode=req.body.countryCode;
    var newUser=new User();
    newUser.id=id;
    newUser.phone=phone;
    newUser.email=email;
    newUser.password=password;
    newUser.role=role;  
    newUser.firstname=firstname;
    newUser.lastname=lastname;
    newUser.countryCode=countryCode;
    User.findOne({$or:[{'phone':phone},{'email':email}]},function(err,user){
        if(err){
        res.send(err)
        }
        if(user){
            res.json({msg:'email / phone already taken'})
        }
        else {
            newUser.save(function(err,savedfile){
                if(err){
                    res.status(500).send()
                }
                else{
                    res.status(200).send(savedfile)
                }
            })
        }
    })

})


    


 module.exports=router;                                                                                                                                