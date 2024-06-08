const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require('cors');
//this thing is required to set so as to set cookies for owr website else using cores it will not allow to set cookies; 
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
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


