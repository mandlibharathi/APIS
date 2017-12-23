var express=require('express');
var app=express();
var mongoose=require('mongoose')
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser')
var User=require('./schema')
var passport=require('passport')
mongoose.connect('mongodb://localhost/Person')
var db=mongoose.connection

var session=require('express-session')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized:true
  }))
app.use(passport.initialize())
app.use(passport.session())
app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
});
    
        app.get('/profile',isLoggedIn, function(req, res) {
            res.render('profile.ejs',{
              user:req.user
            });
        })
    
        function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                    return next();
                res.redirect('/');
                
        }





var router=require('./router')
app.use('/',router);
app.listen(7000);
console.log('server is running ......')
