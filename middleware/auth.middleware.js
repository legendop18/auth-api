const jwt = require("jsonwebtoken")
const User = require("../models/users.js")

const verifyjwt = async (req,res,next) =>{
    const token = req.cookies["token"]

    if(!token){
        res.status(500).json({
            success:false,
            message:"unauthorized"
        });
    };

    const decodedjwt = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decodedjwt._id)

    next()
    
};


module.exports = verifyjwt

