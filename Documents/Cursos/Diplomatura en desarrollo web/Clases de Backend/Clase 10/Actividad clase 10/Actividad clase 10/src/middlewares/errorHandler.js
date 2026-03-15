/**
 * Middleware global para el manejo de errores.
 * Un middleware de error en Express se identifica porque tiene 4 parámetros.
 */
const errorHandler = (err, req, res, next) => {
  
  // 1. Error de Casting: Ocurre cuando MongoDB espera un ID de 24 caracteres 
  // y recibe algo diferente (ej: "123"). Evita que el servidor se rompa.
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Error al parsear datos: El ID enviado no tiene un formato válido.' })
  }

  // 2. Error de Validación: Se dispara cuando el modelo de Mongoose encuentra que 
  // falta un campo obligatorio (required) o el tipo de dato no coincide.
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos inválidos: Verifica que todos los campos obligatorios estén presentes.' })
  }

  // 3. Error de MongoDB: Captura problemas internos del motor de la base de datos, 
  // como claves duplicadas o fallos en la persistencia.
  if (err.name === 'MongoError') {
    return res.status(500).json({ message: 'Error interno en la base de datos.' })
  }

  // 4. Error genérico: Si el error no cae en ninguna de las categorías anteriores,
  // se envía una respuesta 500 (Error interno del servidor).
  // Incluimos err.message para que, como desarrolladora, puedas ver qué pasó en los logs de Railway.
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: err.message 
  })
}

// Exportamos el middleware para usarlo en el index.js principal después de las rutas.
module.exports = errorHandler;