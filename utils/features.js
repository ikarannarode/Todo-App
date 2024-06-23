import jwt from "jsonwebtoken";
export const sendCookie = (user, res, message, statusCode = 200) => {

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    res.status(statusCode).cookie("token", token, { maxAge: 15 * 60 * 1000, httpOnly: true, }).json({
        success: true,
        message
    })

}