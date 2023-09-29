const express = require('express')
const path =  require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
require('dotenv').config()
require('./config/database')
const cors = require("cors");
const app = express();
const PORT = process.env.PORT||3001
//!! For deployment only 
// const corseOptions = require('./config/cores')
// middle Wares
app.use(logger('dev'))
app.use(express.json())
//!! For deployment only 
// app.use(cores(corseOptions))

//!! For local envioment only
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: false }));
//Check for a token and create an req.user prop in the requiest
app.use(require('./config/checkToken'))

//Configure both server-favicon and static middleware
//to serve from the production 'build' folder

app.use(favicon(path.join(__dirname, 'build','favicon.ico')))
app.use(express.static(path.join(__dirname, "build")));






// Put API routes here, before the "catch all" route


app.use('/api/users',require('./routes/api/users'))


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT,()=>{
    console.log(`Express port listening on port ${PORT}`)
})