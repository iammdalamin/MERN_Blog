const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    min: [6, "Minimum 6 character required"],
    max: 64
  },
}, {
  timestamps: true,
versionKey:false});


const User = mongoose.model('users', userSchema);

module.exports = User;
