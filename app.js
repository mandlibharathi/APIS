var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var passport=require('passport')
var mongoose=require('mongoose');
var passbook=require('./models/auth')
mongoose.connect('mongodb://localhost/Person');
var db=mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

var user=require('./router');
app.use('/',user);
app.get('/', function(req, res) {
    res.render('index.ejs'); 
});
app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user 
    });
});
function isLoggedIn(req, res, next) {
    
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }


app.listen(7000);
console.log('servei is running ......')