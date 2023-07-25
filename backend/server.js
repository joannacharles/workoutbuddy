require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes=require('./routes/users')
// express app
const app = express()
//JOANNA
const cors = require('cors');
// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
//JOANNA
app.use(cors())

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}


  app.use(allowCrossDomain);
  //some other code

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user',userRoutes)
// connect to db

mongoose.connect("mongodb://joannacharles098:test@ac-jhjvgfj-shard-00-00.8cshl7a.mongodb.net:27017,ac-jhjvgfj-shard-00-01.8cshl7a.mongodb.net:27017,ac-jhjvgfj-shard-00-02.8cshl7a.mongodb.net:27017/?ssl=true&replicaSet=atlas-qavid0-shard-0&authSource=admin&retryWrites=true&w=majority")
//mongoose.connect("mongodb://joannacharles098:test@mernapp.8cshl7a.mongodb.net:27017,mernapp-shard-00-01-9eaqw.mongodb.net:27017,boursogame-shard-00-02-9eaqw.mongodb.net:27017/test?ssl=true&replicaSet=ClusterMasjeed1-shard-0&authSource=admin&retryWrites=true")
  .then(()=>{console.log('db connected')

  app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
  })


})
  .catch(err=>console.log(err,'db fuckup'))

  