// Middle wear

const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
    let token = req.get('Authorization') || req.query.token
    if(token){
        //Remove the 'Barier' if it was incliuded in the token header

        token = token.replace('Bearer ','')

        jwt.verify(token, process.env.SECRET,function(err,decoded){
            // If invalid taoke, error
            req.user = err?null: decoded.user;
            // If your app cares

            req.exp = err? null: new Date(decoded.exp *1000)
            return next()
        })
    }else{
        req.user = null
        return next()
    }
}