const express=require("express");
const app=express();
const path = require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const fetch=require('node-fetch');
const db=mongoose.connection;

mongoose.connect('mongodb://unbaked:unbaked1@ds239967.mlab.com:39967/unbaked',{ useNewUrlParser:true});
mongoose.set('useCreateIndex', true);
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {         
    // we're connected!
    console.log("Connected To MongoLab Cloud Database :p");
});
mongoose.Promise = global.Promise;

const signin=require('./routes/signin');
const signup=require('./routes/signup');
const blog=require('./routes/blog');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.render(__dirname+'/views/index');
})

app.use('/', signin);
app.use('/',signup);
app.use('/',blog);



app.listen(process.env.PORT||3000,function(){
    console.log("done");
})


