const mongoose = require("mongoose")
const mongodbString = require("../../config/mongo.confiq.js")

mongoose.set('strictQuery', false);
const dbUri = mongodbString.developement
 
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000  })
.then(async (result) => {
console.log('Database connected');

})
.catch((err) => console.log("Database failed to connect"))