require("dotenv").config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;


const getToken= (user) =>{
    return jwt.sign({
        _id: user._id,
        email: user.email
    },JWT_SECRET,{
        'expiresIn':'48h'
    })
}

const isAuth = (req, res, next) => {
    const token =  req.header("x-auth-header");  
    if(!token){
      res.status(401).json({msg:"No token is supplied!"})
    }
    try {
      const decoded = jwt.verify(token,JWT_SECRET);
      req.user = decoded;
      next();
      return;
      
    } catch (error) {
      res.status(401).json({msg:"Token is no valid"})
      
    }
  };
  
const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  };
  
module.exports ={ getToken, isAuth, isAdmin };