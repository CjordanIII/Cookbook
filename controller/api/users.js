
const User = require('../../models/User')
const Post = require('../../models/userData')
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

//*Delete 
 async function deLete(req,res){
  const user = req.user

// finds user and deletes user
 try{
  const Delete = await User.findByIdAndDelete(user._id)
  localStorage.removeItem('SEItoken')
 }catch(err){
  res.send(err)
 }
}

//*Edit controller
//TODO add a redirect
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
//TODO handle img
// newRecipes send to database
async function newRecipe(req,res){

  try{
    const recipesData = JSON.parse(req.headers.body);
    const token = recipesData.token;
    //Decoded token object
    const decoded = jwt.verify(token, process.env.SECRET);
    // current user id
    const userId = decoded.user._id
    const userName = decoded.user.name
    recipesData.userid = userId;
    recipesData.username = userName;
    delete recipesData.token;
    const userPost = await Post.create(recipesData);

  }catch(e){
    console.log(e)
    res.status(400).json({error:e._message})
  }
}

//request post from database

async function recipesData(req,res){
  const allData = await Post.find({})
  
  res.json(allData)
  //  const findPost = await Post.findById()
}

module.exports = {
  create,
  login,
  checkToken,
  deLete,
  updatedUser,
  newRecipe,
  recipesData,
};