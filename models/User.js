const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const data = require('./userData');

const SALT_ROUNDS = 6;


const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true,
  },
  userdata:[data]

},{timestamps:true,
    toJSON: {
        transform: function(doc,ret){
            delete ret.password;
            return ret;
        }
    }
}


);

//pre-save hook

userSchema.pre('save',async function(next){
  // 'this' is the user doc / if the password has not been modified
  if(!this.isModified('password')) return next()
  // update the password
  this.password = await bcrypt.hash(this.password,SALT_ROUNDS)
  return next()
})



module.exports = mongoose.model('User',userSchema)