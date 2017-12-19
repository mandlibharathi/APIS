var passport=require('passport');
var FacebookStrategy=require('passport-facebook').Strategy;
var configAuth=require('./auth')
var path=require('path')
var User=require('/home/gcr/Desktop/REPO/schema.js')
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(user, cb) {
    cb(null, user);
  });
passport.use(new FacebookStrategy({
    clientID:configAuth.facebookAuth.clientID,
    clientSecret:configAuth.facebookAuth.clientSecret,
    callbackURL:configAuth.facebookAuth.callbackURL
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
            var newUser = new User();
            newUser.facebook.id    = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name= profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email=profile.email;
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
