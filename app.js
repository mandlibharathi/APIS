var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Person');
var db=mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
var user=require('./router');
app.use('/api',user);


app.listen(7000);
console.log('servei is running ......')