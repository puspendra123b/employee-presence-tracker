const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
function adminMiddleware(req, res, next) {

    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const verified = jwt.verify(jwtToken , JWT_SECRET)
    if(verified.username){
        next()
    }
    else{
        res.status(403).json({
            msg : "Authorization fail"
        })
    }

}

module.exports = adminMiddleware;