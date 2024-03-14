const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userschema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    
    }
})


userschema.pre("save",async function(next){

    if(!this.isModified("password"))  next()
    this.password = await bcrypt.hash(this.password,10)
    console.log(this.password);
    next()
});

userschema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
};

userschema.methods.generateToken = async function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET)
}





const User = mongoose.model("User",userschema)
module.exports = User