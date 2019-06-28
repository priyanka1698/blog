const express=require('express');
const router=express.Router();
const user = require('../models/signup');
const jwt=require('jsonwebtoken');


router.get('/signin',function (req,res) {
    res.render('signin');
   });

   router.post('/signin',function(req,res){
    console.log(req.body);
    user.findOne({username:req.body.username}).then((user)=>{
        if(user.activation){
            user.comparePassword(req.body.password,(err,isMatch)=>{
                if(isMatch){
                    var token=jwt.sign({id:user._id},process.env.TOKEN_SECRET);
                    console.log(token)
                    res.status(200).json({
                        userId:user.id,
                        username:user.username,
                        image:user.image,
                        name:user.first,
                        token
                                        });
                                    }
                         });
                         res.redirect('/blog');
                        }
                        
        
                else{
                    if(!user.activation)
                       {
                        res.json({message:'email not verified'})
                        }
                    else res.status(200).json({message:'Invaild Password/Username'})
                    }
            })
        })

module.exports=router;