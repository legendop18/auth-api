
const User = require("../models/users.js");


const register = async (req, res) => {

    // TODO : Store user in database base by creating new user

    try {
        const { username, email, password } = req.body


        if (!username || !email || !password) {
            res.status(201).json({
                success: false,
                msg: "username , Email amd password must required"
            })
        };

        let existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(200).json({
                success: false,
                message: "user already exist"
            })
        }

        const user = User.create({ username, email, password })


        return res.status(200).json({
            success: true,
            message: "user created successfully",
            user
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }



}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(200)
                .json({ message: "user not found", success: false })
        }
        if (!email && !password) {
            return res
                .status(500)
                .json({ msg: "Email and password must required" })
        }

        isMatch = await user.isPasswordCorrect(password)
        if (!isMatch) {
            return res
                .status(500)
                .json({ message: "Incorrect password", success: false })
        };

        const token = await user.generateToken(user._id);
        console.log(token)

      
        return res.status(200).cookie("token",token).json({ message: "Login Success", success: true, });


    } catch (error) {
                return res.status(500).json({ success: false, message: error.message })

    }

}





module.exports = { register, login }