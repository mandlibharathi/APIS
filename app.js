var express=require('express');
var app=express();
var mongoose=require('mongoose')
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser')
mongoose.connect('mongodb://localhost/Person')
var db=mongoose.connection
var passport=require('passport')
var session=require('express-session')
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized:true
  }))
app.use(passport.initialize())
app.use(passport.session())
var router=require('./router')
app.use('/',router);

app.get('/',function(req,res){
    res.render('index.ejs',{
        
    })
})
  
app.get('/profile',isLoggedIn,function(req, res) {
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});


function isLoggedIn(req, res, next) {
    
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    
   
   
   
    
    

app.listen(7000);
console.log('servei is running ......')