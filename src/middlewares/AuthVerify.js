const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")


exports.requireSignIn = (req, res, next) => {
    try {
        let token = req.headers["token"];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(400).json({
                    message:"Unauthorized token"
                })
            } else {
                let email = decoded["data"];
                req.headers.email = email;
                next()
            }
        })
    } catch (err) {
        res.status(400).json({
            message:"Something went wrong!"
        })
    }
}