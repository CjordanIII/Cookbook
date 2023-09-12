const User = require('../../models/User')
const jwt = require('jsonwebtoken')

async function create(req,res){
    try{
        const user = await  User.create(req.body)
        const token = createJwt(user)
        res.json(token)
    }catch (error){ 
        res.status(400).json.error

    }

}


function createJwt(user){
    return jwt.sign({user},process.env.SECRET,{expiresIn:'24h'})
}



module.exports= {
    create
}