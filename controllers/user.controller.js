import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    sendCookie(user, res, "Registered successfully", 201)
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found or Invalid email!!"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Incorrect password!"
        })
    }
    sendCookie(user, res, `Welcome back ${user.name}`, 200)
}

export const getAllUser = async (req, res) => { }

export const myProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        profile: req.user
    })
}
export const logout = async (req, res) => {

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "User Logged out successfully"
    })
}
