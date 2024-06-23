import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js"
export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({
            success: false,
            message: "You have to login first"
        })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await User.findById(decoded);
    next();
}