const jwt = require('jsonwebtoken');
require('dotenv');

// Authorization : Bearer + token
const verifyToken = (req, res , next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).send({success : false , message : 'Access token not found !'});
    }
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // decoded = Object jwt sign
        req.userId = decoded.userId;
        next();
    }catch (e) {
        return res.status(403).send({success : false , message : 'Invalid token !'});
    }
};

module.exports = verifyToken;
