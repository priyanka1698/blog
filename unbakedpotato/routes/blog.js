const express=require('express');
const router=express.Router();
const blog=require('../models/blog')
const mongoose=require('mongoose');

mongoose.Promise = global.Promise;



router.get('/blog',function(req,res){
    res.render('blog');
})
router.post('/blog',function(req,res){
       blog.create(req.body);
      blog.find({},{title:1,createdAt:1}).then((found)=>{
         
        res.render('dashboard',{data:found});
        
})
    });
    
router.get('/:id',function(req,res){

    blog.findById(req.params.id,{title:1,tags:1,blog:1}).then((found)=>{
        
        res.render('article',{body:found});
    
        
});
      
})
router.post('/found/:title',function(req,res){
    blog.findOne({title:req.params.title},{title:1,tags:1,blog:1}).then((found)=>{
        res.render('article',{body:found});
});
      
})



module.exports=router;