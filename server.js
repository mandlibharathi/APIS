var express=require('express');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Person')
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
var user=require('./sehema')
app.post('/api',function(req,res){
    var users=req.body;
user('users',function(err,user){
if(err){
    res.json(err)
}
else{
    res.json(user)
}
});
});
app.listen(7000);
console.log('eveything is fine now ')