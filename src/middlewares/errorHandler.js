/**
 * Middleware global para el manejo de errores.
 * En Express, un middleware de error siempre recibe 4 argumentos: (err, req, res, next).
 */
const errorHandler = (err, req, res, next) => {
  
  // 1. Error de Casting (Ej: Enviar un ID de MongoDB con formato incorrecto)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Error al parsear datos' })
  }

  // 2. Error de Validación (Ej: Falta un campo requerido en el modelo o tipo de dato mal enviado)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos inválidos' })
  }

  // 3. Error específico de la base de datos MongoDB (Ej: Duplicados o problemas de conexión)
  if (err.name === 'MongoError') {
    return res.status(500).json({ message: 'Error de base de datos' })
  }

  // 4. Error genérico (Cualquier otro fallo no previsto)
  // Enviamos un código 500 y el mensaje del error para facilitar la depuración
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: err.message 
  })
}

// Exportamos la función para registrarla en el archivo principal (usualmente app.use(errorHandler))
module.exports = errorHandler