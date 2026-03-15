// 1. Importación de Express y el enrutador
const express = require('express');
const router = express.Router();

// 2. Importación del controlador de películas
const movieController = require('../controllers/movieController.js');

/**
 * =============================================================================
 * DEFINICIÓN DE RUTAS PARA PELÍCULAS
 * =============================================================================
 */

// Obtener todas las películas (con filtro opcional ?genre=...)
router.get('/', movieController.getMovies);

// Obtener películas de un director específico
router.get('/director/:director', movieController.getMoviesByDirector);

// Obtener una película por su ID único
router.get('/:id', movieController.getMovieById);

// Crear una nueva película (POST)
router.post('/', movieController.createMovie);

// Actualización TOTAL (PUT): Se espera que envíes todo el objeto
router.put('/:id', movieController.updateMovie);

// Actualización PARCIAL (PATCH): Ideal para actualizar solo el 'rate' o un campo suelto
// Este es el que necesitabas para que tu api.http funcione correctamente
router.patch('/:id', movieController.updateMovie);

// Eliminar una película (DELETE)
router.delete('/:id', movieController.deleteMovie);

// Exportamos las rutas para que el index principal las use
module.exports = router;