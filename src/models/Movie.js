// 1. Importamos la librería mongoose para interactuar con MongoDB
const mongoose = require('mongoose')

/**
 * 2. Definimos el Esquema (Schema) de la película.
 * El esquema dicta qué campos tendrá cada documento y de qué tipo serán.
 */
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,   // Tipo de dato: Cadena de texto
    required: true  // Es obligatorio para poder guardar la película
  },
  year: {
    type: Number,   // Tipo de dato: Número (Año de estreno)
    required: true  // Es obligatorio
  },
  director: {
    type: String,   // Tipo de dato: Cadena de texto
    required: true  // Es obligatorio
  },
  duration: {
    type: Number,   // Tipo de dato: Número (Duración en minutos)
    required: true  // Es obligatorio
  },
  poster: {
    type: String,   // Tipo de dato: Cadena de texto (URL de la imagen)
    required: false // No es obligatorio (opcional)
  },
  genre: {
    type: [String], // Tipo de dato: Un array (lista) de cadenas de texto
    required: true  // Es obligatorio
  },
  rate: {
    type: Number,   // Tipo de dato: Número (Calificación)
    required: false, // Es opcional
    default: 5      // Si no se envía una nota, por defecto se guarda como 5
  }
})

/**
 * 3. Creamos el Modelo a partir del esquema.
 * 'Movie' será el nombre de la colección en la base de datos (se guardará como 'movies').
 */
const Movie = mongoose.model('Movie', MovieSchema)

// 4. Exportamos el modelo dentro de un objeto para usarlo en los servicios (Services)
module.exports = { Movie }