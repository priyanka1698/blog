const mongoose=require('mongoose');
const bcrypt=require('bcrypt');


var userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    Interest:{type:String,required:true},
    Image:{type:String},
    activation:{type:Boolean,default:false},
    Username:{type:String,unique:true},
    password:{type:String}

},{collection:'users'});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
})
userSchema.methods.comparePassword=function(candidatePassword,next){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return next(err);
        next(null,isMatch)
    })
}
module.exports=mongoose.model('User', userSchema);
