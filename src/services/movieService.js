const { Movie } = require('../models/Movie.js')

/**
 * Función auxiliar para verificar si un ID tiene el formato correcto de MongoDB.
 * Evita que la app intente buscar IDs malformados y lance un error de sistema.
 */
const isValidObjectId = (id) => {
  const mongoose = require('mongoose')
  if (!id || typeof id !== 'string') return false
  return mongoose.Types.ObjectId.isValid(id)
}

/**
 * Lógica de Negocio: Validación manual de datos.
 * Esto asegura que los datos sean lógicos antes de enviarlos a Mongoose.
 */
const validateMovieData = (data) => {
  const errors = []

  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    errors.push('Falta el título')
  }
  // Valida que el año sea realista (después de la invención del cine)
  if (!data.year || typeof data.year !== 'number' || data.year <= 1800 || data.year >= 3000) {
    errors.push('El año ingresado es inválido')
  }
  if (!data.director || typeof data.director !== 'string' || data.director.trim() === '') {
    errors.push('Falta el director')
  }
  if (!data.duration || typeof data.duration !== 'number' || data.duration <= 0) {
    errors.push('La duración ingresada es inválida')
  }
  if (!data.poster || typeof data.poster !== 'string' || data.poster.trim() === '') {
    errors.push('Falta la imagen')
  }
  // Nota: Aquí validas genre como string, pero en el modelo es un [String]. 
  // Si envías un array, esta validación podría fallar.
  if (!data.genre || typeof data.genre !== 'string' || data.genre.trim() === '') {
    errors.push('Falta el género')
  }
  if (!data.rate || typeof data.rate !== 'number' || data.rate <= 0 || data.rate >= 10) {
    errors.push('La calificación ingresada es inválida')
  }
  return errors
}

const movieService = {
  // Trae todas las películas o filtra por género usando una expresión regular insensible a mayúsculas
  getMovies: async (genre) => {
    const query = genre ? { "genre": { "$regex": `^${genre}$`, "$options": "i" } } : {}
    return await Movie.find(query)
  },

  // Busca una película específica por su ID único
  getMovieById: async (id) => {
    return await Movie.findById(id)
  },

  // Filtra películas que coincidan exactamente con el nombre del director
  getMoviesByDirector: async (director) => {
    return await Movie.find({ director })
  },

  // Crea una película previa validación de los datos recibidos
  createMovie: async (movieData) => {
    const errors = validateMovieData(movieData)
    if (errors.length > 0) {
      // Si hay errores, lanza una excepción que capturará el controller/errorHandler
      throw new Error(errors.join(', '))
    }
    const newMovie = new Movie(movieData);
    return await newMovie.save()
  },

  // Elimina el documento de la base de datos
  deleteMovie: async (id) => {
    return await Movie.findByIdAndDelete(id)
  },

  // Actualiza y retorna el documento ya modificado ({ new: true })
  updateMovie: async (id, movieData) => {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true })
  }
}

module.exports = movieService