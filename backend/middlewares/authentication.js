const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const providedToken = req.headers.authorization.split(" ")[1];
    const secret = "HushhhhhhhhhhThisIsASecret"
    jwt.verify(providedToken, secret, (err, result) => {
        if(err){
            res.status(404).json("Forbidden")
        }
        else{
            req.token = result;
            next()
        }
    })
}

module.exports = authentication;