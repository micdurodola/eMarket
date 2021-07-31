const router = require('express').Router();
const AuthToken = require('../util');
let User = require('../models/auth/user.model');
const bcrypt = require('bcrypt');


// Register a new User
router.post("/register",async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password= req.body.password;

    const newRuser = new User({
      name,
      email,
      password
    });
    const salt = await bcrypt.genSalt(10);
    newRuser.password = await bcrypt.hash(newRuser.password,salt);
    const newUser = await newRuser.save();

    if (newUser) {
        res.send({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: AuthToken.getToken(newUser)
        });
      } else {
        res.status(401).send({ message: 'Invalid User Data.' });
      }
 
    }
);


// Get list of registered user
router.route("/").get((req,res)=>{
    User.find()
        .then((user)=>{
            res.send(user)
        })
        .catch((error)=> res.status(400).json('Error: ' +error));
});

module.exports = router;