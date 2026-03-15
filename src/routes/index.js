// Este archivo vive en src/routes/index.js

// 1. Importamos Express para usar su sistema de ruteo
const express = require('express');
// 2. Importamos las rutas específicas de películas (asegurate que el archivo exista al lado)
const movieRoutes = require('./movieRoutes');
// 3. Creamos el enrutador
const router = express.Router();

// 4. Ruta de prueba para saber si el servidor responde en la raíz
router.get('/', (req, res) => {
  res.send('🚀 ¡Hola! El servidor de Daniela Romero está funcionando perfectamente.');
});

// 5. Agrupamos todas las rutas de películas bajo el prefijo '/movies'
// Esto significa que para ver películas irás a: /movies
router.use('/movies', movieRoutes);

// 6. Exportamos este organizador para que el "Jefe" (index.js raíz) lo reciba
module.exports = router;