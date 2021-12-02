const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: 'This field is required.'
  },
  imagen: {
    type: String,
    required: 'This field is required.'
  },
});

module.exports = mongoose.model('Tipo', tipoSchema);