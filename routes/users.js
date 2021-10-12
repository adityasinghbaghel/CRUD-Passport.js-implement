var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbtesterapp')

var userSchema = mongoose.Schema({
  name : String,
  password : String
})

module.exports = mongoose.model('user' , userSchema);