const express = require("express");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./schema");
const Feedback = require("./models/Feedback");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ message: "fill all the fields" });
  }

  try {
    const repeat_user = await User.findOne({ username: username });

    if (repeat_user) {
      return res.status(422).json({ message: "username already Exists !!" });
    }

    const new_user = new User({ username, password });

    await new_user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log(err);
  }
  // console.log(req.body);
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Fill both userid and password !!" });
    }

    const userlogin = await User.findOne({ username: username });

    // if not userid matched then will show error
    if (!userlogin) {
      return res.status(400).json({ error: "Wrong credentials" });
    }

    // comparing for hash value that we created to store in DB for password
    const isMatch = await bcrypt.compare(password, userlogin.password);
    // we are generating jwt token when a user logged in
    const usertoken = await userlogin.generateAuthToken();
    console.log(usertoken);
    res.cookie("pigeonJWT", usertoken);
    if (isMatch) {
      return res.json({ message: "User login successfully !" });
    } else {
      return res.status(400).json({ error: "Wrong credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newFeedback = new Feedback({ name, email, message });
     await newFeedback.save();
    res
      .status(201)
      .json({ message: "Feedback submitted successfully" })
    //   .send(newFeedback);
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.nickname;
 console.log('Recieved', query);
  if (!query) {
    console.log('Name query parameter is missing');
    return res.status(400).json({ error: 'username query parameter is required' });
  }

  try {
    const users = await User.find({ nickname: new RegExp(query, 'i') }); // Case-insensitive search
    console.log('Found users:', users); // Log the results
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
// kyu export krra hai jbki conn.js me to nhi krna pdra export...... and kb kb export krna pdta h???;
