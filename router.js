var express=require('express');
var router=express.Router();
var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');
var passport=require('passport');
var FacebookStrategy=require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth=require('./models/auth')
var User=require('./schema')

var verifytoken=require('./models/token');
router.get('/authendication',verifytoken,function(req,res){
        User.findById(req.userid, { password: 0 }, function (err, user) {
 if (err) return res.status(500).send("There was a problem finding the user.");
 if (!user) return res.status(404).send("No user found.");
           else{ 
            res.status(200).send(user);
           }
          });
    })
    router.put('/update',verifytoken,function(req,res){
        var firstname=req.body.firstname;
        var lastname=req.body.lastname;
        User.findByIdAndUpdate(req.userid,{firstname:firstname,lastname:lastname},function(err,user){
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


passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(id, cb) {
      User.findById(id,function(user){
          cb(null,user)
      })
    
  })
passport.use(new FacebookStrategy({
    clientID:configAuth.facebookAuth.clientID,
    clientSecret:configAuth.facebookAuth.clientSecret,
    callbackURL:configAuth.facebookAuth.callbackURL,
    profileFields   : configAuth.facebookAuth.profileFields
},
function(accessToken,verifyToken,profile,cb){
   process.nextTick(function(){
       User.findOne({'facebook.id':profile.id},function(err,user){
           if(err){
               return cb(err)
           }
           if(user){
               return cb(null,user)
           }
           else{
            var newUser=new User()
            newUser.facebook.id    = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name= profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email=profile.emails[0].value;
            newUser.save(function(err){
                   if(err){
                       throw err
                   }
                   else{
                       cb(null,newUser)
                   }
               })   
                  
           }
       })
    })
}))

  
router.get('/auth/facebook',passport.authenticate('facebook',{scpoe:['email']}))
router.get('/auth/facebook/callback',passport.authenticate('facebook',{successRedirect : '/profile',
failureRedirect : '/'}))

passport.use(new GoogleStrategy({
    clientID:configAuth.googleAuth.clientID,
    clientSecret:configAuth.googleAuth.clientSecret,
    callbackURL:configAuth.googleAuth.callbackURL
    
},
function(accessToken,verifyToken,profile,cb){
   process.nextTick(function(){
       User.findOne({'google.id':profile.id},function(err,user){
           if(err){
               return cb(err)
           }
           if(user){
               return cb(null,user)
           }
           else{
            var newUser=new User()
            newUser.google.id    = profile.id;
            newUser.google.token = accessToken;
            newUser.google.name= profile.displayName;
            newUser.google.email=profile.emails[0].value
            newUser.save(function(err){
                   if(err){
                       throw err
                   }
                   else{
                       cb(null,newUser)
                   }
               })   
                  
           }
       })
    })
}))

router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));

	router.get('/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/profile',
	                                      failureRedirect: '/index' }))

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
else{
   
            newUser.save(function(err,savedfile){
                if(err){
                    res.status(404).send()
                }
                else{
                    res.status(201).send(savedfile)
                }
            })
        }
    })

})

   


    


 module.exports=router;                                                                                                                                