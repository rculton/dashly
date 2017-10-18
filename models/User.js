//User Model
const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),

  topicSchema = new mongoose.Schema({
      artistName: String,
      footballTeam: String,
      actorName: String
  })
  userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    topics: [topicSchema]
})

//"Salt" a password, encrypting it. Number denotes how many times it's "salted"
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

//Check the password for validity. Salts the inputted password attempt, checks it against pre-salted password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)