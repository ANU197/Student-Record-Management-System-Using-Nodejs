const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  gender:{
    type: String,
    required:true
  },
  father: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
