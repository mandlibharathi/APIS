var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Person');
var db=mongoose.connection;
app.use(bodyParser.json());
var user=require('./router');
app.set('view engine','pug')
app.use('/api',user);


app.listen(7000);
console.log('servei is running ......')