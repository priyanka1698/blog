var mongoose=require("mongoose");
var moment=require('moment');

var publishDate=function(){
  return moment().format('D/M/YYYY');
}

var blogSchema=new mongoose.Schema({
    title: {type:String},
    tags:{type:String},
    image:{
        type:String,
          },
    blog:{type:String},
    createdAt:{type:String,default:publishDate()}
},{collection:'blogs'});



module.exports=mongoose.model('blog',blogSchema);