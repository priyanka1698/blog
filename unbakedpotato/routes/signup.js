const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
var nodemailer = require('nodemailer');
require('dotenv').config();
const User = require('../models/signup');
router.get('/signup',function (req,res) {
 res.render('signup');
});
router.get('/signin',function (req,res) {
	res.render('signin');
   });
router.get('/verify',function (req,res) {
	res.render('verify');
   });

//validation
const Joi=require('@hapi/joi');

const schema={
	name:Joi.string().min(6).required(),
	email:Joi.string().min(6).required().email(),
	Interest:Joi.string().min(6).required(),
	image:Joi.string(),
	Username:Joi.string(),
	password:Joi.string().min(6).required()
}

router.post('/signup',function (req,res) {

	//lets validate
	const  {error}=Joi.validate(req.body,schema);
	if(error) return res.json({err:error.details[0].message});

	//jwt
    User.create(req.body).then((User)=>{
	const token=jwt.sign({id:User._id},process.env.TOKEN_SECRET);
	var persons=[req.body.email];
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'riyakhazanchi8@gmail.com',
    pass: 'Ridham@2002'
  }
});

var mailOptions = {
  from: 'riyakhazanchi8@gmail.com',
  to: persons,
  subject: 'abc',
  html:`<a href="http://localhost:3000/signup/${token}">Click Here to verify</a>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	});
	res.redirect('/verify');
	});
router.get('/signup/:token',function(req,res){
	const token = req.params.token
					jwt.verify(token, process.env.TOKEN_SECRET, function (err, payload) {
						if (payload) {
                          console.log(payload.id);
						   User.findById(payload.id).then((found)=>{
							 found.activation=true;
							 found.save();
							   console.log(found);
							   
							   res.redirect('/signin');
						   });
						   
						} else {
							res.json({message:'not-verified'});
							
							 }
							});

					});
						 
module.exports=router;
