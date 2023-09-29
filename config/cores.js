

const allowedOrigins = [path]
const corseOptions={
  origin:(origin,callback)=>{
    if(allowedOrigins.incudes(origin)||!origin){
      callback(null,true)
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  }
}
module.exports = corseOptions
