const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'users'});

userSchema.pre('save', function(next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

User = mongoose.model('users', userSchema);

module.exports = User;