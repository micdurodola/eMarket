const router = require('express').Router();
const AuthToken = require('../util');
let User = require('../models/auth/user.model');
const bcrypt = require('bcrypt');


router.post("/login",async(req,res)=>{
    const password = req.body.password;
    const user = await User.findOne({
        email:req.body.email
    })
    if(user){
        validPassword = await bcrypt.compare(password,user.password);
        if(validPassword){
            res.send({
                     _id:user._id,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:AuthToken.getToken(user)
                        }); 
        }
        else{
            res.status(401).send({ message: 'Invalid Email or Password.' });
            
        }
    }
    else{
        res.status(401).send({ message: "User not found!" });
       
    }
});


module.exports= router;
    
   
    
    




// router.route("/login").post(async(req,res)=>{
//     const loginUser =  await User.findOne({
//         email: req.body.email,
//         password:req.body.password
           
//     });    
    
//     if(loginUser){
//             res.send({
//                 _id:loginUser._id,
//                 email:loginUser.email,
//                 isAdmin:loginUser.isAdmin,
//                 token:AuthToken.getToken(loginUser)
//             }); 
//         }   

//     else{
//         res.status(400).json('User not found!');
//     }
            

// });

