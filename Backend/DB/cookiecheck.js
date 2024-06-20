const express = require('express');
const User = require('./schema');
const jwt = require('jsonwebtoken');

const cookiecheck = async (req, res , next )=>{
    console.log("ha bhai");
        try{

            const token = req.cookies.pigeonJWT; //cookies.{cookie ka name jo likhe ho vo likhna h }
            if(!token)console.log("kuch ni aaya bhai");

            console.log("ye le - " + token);
            const verifyToken = jwt.verify(token , process.env.SECRET_KEY);

            const rootUser = await User.findOne({_id:verifyToken._id , "tokens.token": token});

            if(!rootUser){
                throw new Error("user not found");
            }
            req.token = token;
            req.rootUser = rootUser;
            req.userID = rootUser._id;

            next();

        } catch(err){
                res.status(401).send('unauthorized:N token provided');
                console.log(err);
        }
}

module.exports = cookiecheck;