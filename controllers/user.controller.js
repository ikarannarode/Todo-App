import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/user.error.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400))
        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        sendCookie(user, res, "Registered successfully", 201)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400))
        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) return next(new ErrorHandler("Incorrect password!", 400));

        sendCookie(user, res, `Welcome back ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
}


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
