var express=require('express');
var mongo=require('mongodb');
var url='mongodb://localhost/Person'
mongo.connect(url,function(err,res){
    if(err){
       console.log(err)
    }
    else{
       console.log('conneccted succefully')
    }
})

module.exports=mongo;