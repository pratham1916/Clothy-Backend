const jwt  = require("jsonwebtoken");
const userModel = require("../model/user.model");
require("dotenv").config()

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,async(err,decode)=>{
            if(decode){
                const user = await userModel.findOne({_id : decode.userId});
                req.body.userId = decode.userId
                next();
            }
        })
    }
    else{
        res.json({ msg: "Please Login" })
    }
}

module.exports = {
    auth
}