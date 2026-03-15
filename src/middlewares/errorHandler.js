// Este archivo vive en src/middlewares/errorHandler.js

// Definimos la función que recibe el error (err) y la respuesta (res)
const errorHandler = (err, req, res, next) => {
    // Si el error trae un código (404, 400), lo usamos; si no, usamos 500 (Error interno)
    const statusCode = err.statusCode || 500;
    
    // Mostramos el error en la consola para que vos, como desarrolladora, lo veas
    console.error(`[SYSTEM ERROR]: ${err.message}`);

    // Le enviamos al cliente (Postman/Navegador) una respuesta prolija en JSON
    res.status(statusCode).json({
        success: false, // Indicamos que la operación falló
        message: err.message || 'Error interno del servidor', // Explicamos qué pasó
        // Si estamos programando (development), mostramos dónde falló el código (stack)
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

// Exportamos la función para que el index.js la pueda usar
module.exports = errorHandler;