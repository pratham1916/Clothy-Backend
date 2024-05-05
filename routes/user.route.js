const express = require("express");
const multer = require("multer");
const { storage } = require("../middleware/upload.middleware");
const userModel = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { auth } = require("../middleware/auth.middleware");
const upload = multer({ storage: storage })
require("dotenv").config()

userRouter.get("/", auth, (req, res) => {
    res.send("User router");
})

userRouter.post("/register", upload.single('avatar'), async (req, res) => {
    const { fullname, email, password, phone_number } = req.body;
    const avatar = req.file ? req.file.path : undefined;
    console.log(avatar);
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: "User already in exists!" });
        }
        
        const hash = await bcrypt.hash(password, 5);
        const user = new userModel({
            fullname,
            email,
            password: hash,
            phone_number,
            avatar
        });
        await user.save();
        res.status(201).json({ message: "Registration Successful" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error checking credentials" });
            }
            if (result) {
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
                res.status(200).json({ message: "Login Successful", token, user });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
});


module.exports = {
    userRouter
}