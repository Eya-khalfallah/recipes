const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  photo: {
    type: String,
    default: 'icon',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
