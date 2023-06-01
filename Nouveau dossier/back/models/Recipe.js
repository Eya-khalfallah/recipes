const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
      },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  nb_likes: {
    type: Number,
    default: 0,
  }
});

const Recipe = mongoose.model( 'Recipe', recipeSchema);

module.exports = Recipe;
