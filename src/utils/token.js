require('dotenv').config()
const jwt = require('jsonwebtoken')
const {
    JWT_SECRET,
    JWT_EXPIRE_TIME
} = process.env

exports.createToken = async (email) => {
    try {
        const token = jwt.sign({
            email
        }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE_TIME
        })

        return token
    } catch (err) {
        res.status(409).json({
            message: "Token was not created",
            err
        })
    }
}

exports.verifyToken = async (token) => {
    try {
        const verifyNewToken = jwt.verify(token, JWT_SECRET)

        if (!verifyNewToken) {
            res.status(401).json({
                message: "Authorization error, Please Login"
            })
        }
        // made the decoded token global
        req.token = verifyNewToken
        req.user = verifyNewToken
    } catch (err) {
        res.status(500).json({
            message: "Token couldn't be verified",
            err
        })
    }

}