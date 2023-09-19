
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function create(req,res){
  console.log('from controllers line 5',req.body)
    try{
        const user = await User.create(req.body)
        console.log(user)
        const token = createJwt(user)
        res.json(token)
    }catch (error){ 
        res.status(400).json(error)

    }

}

//login
async function login(req, res) {
  try {
    // find a user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();

    // comparing password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();

    // create new token
    const token = createJwt(user);
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function checkToken(req,res){

  await res.json(req.exp)
}
// helper function to create jwt token
function createJwt(user){
    return jwt.sign({user},process.env.SECRET,{expiresIn:'24h'})
}

// curently7 woirking
 async function deLete(req,res){
  const user = req.user

// how to make work
 try{
  const Delete = await User.findByIdAndDelete(user._id)
  localStorage.removeItem('SEItoken')
 }catch(err){
  res.send(err)
 }
}



module.exports = {
  create,
  login,
  checkToken,
  deLete,
};