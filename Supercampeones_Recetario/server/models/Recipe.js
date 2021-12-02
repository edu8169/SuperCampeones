const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: 'This field is required.'
  },
  duracion: {
    type: String,
    required: 'This field is required.'
  },
  steps: {
    type: Array,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  tipo: {
    type: String,
    enum: ['Carne', 'Mariscos', 'Saludable', 'Vegetariano'],
    required: 'This field is required.'
  },
  imagen: {
    type: String,
    required: 'This field is required.'
  },
});

recipeSchema.index({ nombre: 'text'});
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);