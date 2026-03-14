// Importa el módulo mongoose para interactuar con la base de datos MongoDB
const mongoose = require('mongoose')

// Define una función asíncrona para manejar la conexión
const connectDB = async () => {
  try {
    // Determina el entorno actual (desarrollo por defecto si no está definido)
    const ENV = process.env.NODE_ENV || 'development'
    
    /* Comentado: Forma antigua usando la librería externa dotenv
       const dotenv = require('dotenv')
       dotenv.config({ path: `.env.${ENV}` }) */
    
    // Carga el archivo de variables de entorno correspondiente de forma nativa (Node 20.6+)
    process.loadEnvFile(`.env.${ENV}`) 

    // Extrae las variables necesarias del objeto process.env mediante destructuración
    const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } =
      process.env;

    // Crea la cadena de conexión (URI). Si es 'development', concatena el nombre de la BD
    const MONGODB_URI = ENV === 'development'
      ? `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
      : `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}`

    // Intenta realizar la conexión a MongoDB usando la URI generada
    await mongoose.connect(MONGODB_URI)

    // Si la conexión tiene éxito, lo informa en la consola
    console.log('Conectado a la base de datos')

  } catch (error) {
    // Si ocurre un error en el bloque try, se captura y se informa aquí
    console.log('Error al conectarrse a la BD')
    
    // Lanza el error para que pueda ser manejado por quien llame a esta función
    throw error
  }
}

// Exporta la función para que pueda ser utilizada en otros archivos del proyecto
module.exports = connectDB