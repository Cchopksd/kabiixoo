const { expressjwt: expressJWT } = require("express-jwt")

// ตรวจสอบ Token
exports.requireLogin = expressJWT({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty:"auth"
})