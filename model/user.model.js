const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true  },
    phone_number: { type: String ,required: true },
    avatar: {type: String}
})

const userModel = mongoose.model("Users",userSchema);
module.exports=userModel;