const express = require('express');
const User = require('./schema');
var bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', (req,res)=>{
    res.send("hello");
});


router.post('/register', async (req,res)=>{
    console.log("yoiiiis")
    const {username,password}= req.body;

    if(!username || !password){
        return res.status(422).json({error: "fill all the fields"});
    }

    try{

       const repeat_user= await User.findOne({username : username});

       if(repeat_user){
        return res.status(422).json({error: "username already Exists !!"});
       }

       const new_user = new User({username  , password });

      await new_user.save();
      res.status(201).json({message:"User Registered Successfully"});

    }catch(err){
        console.log(err);
    }
    // console.log(req.body);
});


router.post('/login', async (req,res)=>{
    try{
            const {username , password}=req.body;
            if(!username || !password){
                return res.status(400).json({error: "Fill both userid and password !!"});
            }

            
            const userlogin= await User.findOne({username : username});

            // if not userid matched then will show error
            if(!userlogin){
                return res.status(400).json({error: "Wrong credentials"});
            }

            // comparing for hash value that we created to store in DB for password
            const isMatch = await bcrypt.compare(password,userlogin.password);
             if(isMatch){
                return res.json({message: "User login successfully !"});
            }
            else{
                return res.status(400).json({error: "Wrong credentials"});
            }
    }catch(err){
        console.log(err);
    }
})
module.exports = router;
// kyu export krra hai jbki conn.js me to nhi krna pdra export...... and kb kb export krna pdta h???;