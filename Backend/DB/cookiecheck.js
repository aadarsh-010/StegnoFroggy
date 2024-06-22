import express from 'express';
import User from './schema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:"./config.env"});

const cookiecheck = async (req, res , next )=>{
    console.log("ha bhai");
        try{

            const token = req.cookies.jwtoken; //cookies.{cookie ka name jo likhe ho vo likhna h }
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

export default cookiecheck;