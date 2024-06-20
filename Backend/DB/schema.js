const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema =  new mongoose.Schema({
    nickname : {
        type : String,
        required : true
    },
    username : {
            type : String,
            required : true
    },
    password : {
        type : String,
        required : true
    },
    tokens :[
       { token :{
            type : String,
            required : true    
        }}
    ]
})

userSchema.pre('save',async function(next){
    // console.log("hi from inside");

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
            let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token : token});
            await this.save();
            return token;
    }catch(err){
            console.log("error on  schemas page"- err);
    }
}

const User = mongoose.model('USER',userSchema);

module.exports = User;