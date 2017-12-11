var express=require('express');
var router=express.Router();
var User=require('./schema');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');
router.get('/authndication',verifyToken,function(req,res){
        User.findById(req.userid, { password: 0 }, function (err, user) {
 if (err) return res.status(500).send("There was a problem finding the user.");
 if (!user) return res.status(404).send("No user found.");
           else{ 
            res.status(200).send(user);
           }
          });
    })
    router.put('/update',verifyToken,function(req,res){
        var firstname=req.body.firstname;
        var lastname=req.body.lastname;
        User.findByIdAndUpdate(req.userid,{firstname:req.body.firstname,lastname:req.body.lastname},function(err,user){
           if(err){
               res.status(500).send('there isproblem to find user')
           } 
           if(!user){
               res.status(404).send('no user found')
           }
           else {
               res.status(200).send('updated sucessfully' +user)
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
        
        var passwordIsValid = bcrypt.compareSync( req.body.password,user.password) 
           var token=jwt.sign({id:user._id},'secret') 
           if(!passwordIsValid){
               res.status(401).send({sucess:false,token:null})
           }
        res.status(200).send({auth:true,token:token})
            
        
    
    
    })
}) 
    

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      // if everything good, save to request for use in other routes
      req.userid = decoded.id;
      next();
})
  }


router.post('/signup',function(req,res){
    var hashedPassword = bcrypt.hashSync(req.body.password)
    var id=req.body.id;
    var phone=req.body.phone;
    var email=req.body.email;
    var password=hashedPassword;
    var role=req.body.role;
    var firstname=req.body.firstname;
     var lastname=req.body.lastname;
    var countryCode=req.body.countryCode;
    var newUser=new User();
    newUser.id=id;
    newUser.phone=phone;
    newUser.email=email;
    newUser.password=hashedPassword;
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
                    res.status(404).send()
                }
                else{
                    res.status(201).send(res.json(savedfile))
                }
            })
        }
    })

})

   


    


 module.exports=router;                                                                                                                                