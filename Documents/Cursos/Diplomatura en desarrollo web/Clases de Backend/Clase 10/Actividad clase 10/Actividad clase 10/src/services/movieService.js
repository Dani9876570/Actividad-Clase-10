const { Movie } = require('../models/Movie.js')

const isValidObjectId = (id) => {
  const mongoose = require('mongoose')
  if (!id || typeof id !== 'string') return false
  return mongoose.Types.ObjectId.isValid(id)
}

const validateMovieData = (data) => {
  const errors = []

  if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
    errors.push('Falta el título')
  }
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
  if (!data.genre || typeof data.genre !== 'string' || data.genre.trim() === '') {
    errors.push('Falta el género')
  }
  if (!data.rate || typeof data.rate !== 'number' || data.rate <= 0 || data.rate >= 10) {
    errors.push('La calificación ingresada es inválida')
  }
  return errors
}

const movieService = {
  getMovies: async (genre) => {
    const query = genre ? { "genre": { "$regex": `^${genre}$`, "$options": "i" } } : {}
    return await Movie.find(query)
  },
  getMovieById: async (id) => {
    return await Movie.findById(id)
  },
  getMoviesByDirector: async (director) => {
    return await Movie.find({ director })
  },
  createMovie: async (movieData) => {
    const errors = validateMovieData(movieData)
    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }
    const newMovie = new Movie(movieData);
    return await newMovie.save()
  },
  deleteMovie: async (id) => {
    return await Movie.findByIdAndDelete(id)
  },
  updateMovie: async (id, movieData) => {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true })
  }
}

module.exports = movieService