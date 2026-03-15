// 1. Importamos la librería mongoose para interactuar con MongoDB
const mongoose = require('mongoose')

/**
 * 2. Definimos el Esquema (Schema) de la película.
 * El esquema actúa como un "molde" o contrato que define la estructura de los datos.
 */
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,   // Define que el título debe ser una cadena de texto
    required: true  // Mongoose rechazará el guardado si este campo falta
  },
  year: {
    type: Number,   // Año de estreno como valor numérico
    required: true  // Obligatorio para mantener la integridad cronológica
  },
  director: {
    type: String,   // Nombre del director
    required: true  // Obligatorio
  },
  duration: {
    type: Number,   // Duración expresada en minutos
    required: true  // Obligatorio (validamos esto en las pruebas POST)
  },
  poster: {
    type: String,   // URL de la imagen (string)
    required: false // Opcional: si no hay imagen, el documento se crea igual
  },
  genre: {
    type: [String], // Array de strings: permite guardar múltiples géneros (ej: ["Acción", "Sci-Fi"])
    required: true  // Obligatorio: toda película debe tener al menos un género
  },
  rate: {
    type: Number,   // Calificación numérica
    required: false, // Opcional: se puede calificar después (con el método PATCH)
    default: 5      // Valor inicial automático si el usuario no proporciona uno
  }
})

/**
 * 3. Creamos el Modelo a partir del esquema.
 * Mongoose transformará 'Movie' automáticamente a minúsculas y plural ('movies') 
 * para nombrar la colección en MongoDB.
 */
const Movie = mongoose.model('Movie', MovieSchema)

// 4. Exportamos el modelo dentro de un objeto para que los Services puedan realizar el CRUD
module.exports = { Movie }