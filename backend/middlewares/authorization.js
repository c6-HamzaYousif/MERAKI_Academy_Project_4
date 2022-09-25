const jwt = require('jsonwebtoken');

const authorization = (str) => {
    return (req, res, next) => {
        const permissionsArray = req.token.permissions;
        if(permissionsArray.includes(str)){
            next()
        }else{
            res.status(404).json("access denied")
        }
    }
}

module.exports = authorization;