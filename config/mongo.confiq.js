const mongodbString = `mongodb+srv://valiantjoee:hj5q1dneSfeFBEKf@cluster0.k7tpqpw.mongodb.net/highscoretech?retryWrites=true&w=majority&appName=Cluster0`
const mongodbLocal = `mongodb://localhost:27017/highscoretech`

module.exports = {developement:mongodbLocal, production: mongodbString  }