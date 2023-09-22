
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRounds = 6
// createing user and taoken
async function create(req,res){
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

// Eddit contorller 
async function updatedUser(req, res) {
  try {
    // takes (req.body) req.headers.body and turning into js
    let headerBody = JSON.parse(req.headers.body);
    //seperating password to hash
    let password = headerBody.password
    //saving has to data base
    bcrypt.hash(password,saltRounds,function(err,hash){
      if(err){
        console.log('error hasing password: ',err)
        return;
      }
       headerBody.password =  hash;
    });

    const findUser = await User.findById(req.user._id);
    const updatedUser = await User.findByIdAndUpdate(req.user._id, headerBody, {
      new: true,
    });

    // Optionally, send a response
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  create,
  login,
  checkToken,
  deLete,
  updatedUser,
};