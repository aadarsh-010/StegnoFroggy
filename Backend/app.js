const express = require("express");
const app = express();
const dotenv = require("dotenv");


//.env =  ki kya zrwt hai bhai teri jab teko upload hi nhi krre???
dotenv.config({path:"./config.env"});
require("./DB/conn.js");
const User = require("./DB/schema.js");


app.use(express.json());


// middle ware connection for routing
app.use(require("./DB/Authentication.js"));  // doubt - why using middle where;???

// app.get('/', (req,res)=>{
//     res.send("hello");
// });



app.listen(5000, ()=>{
    console.log("connected to port 5000");
});


