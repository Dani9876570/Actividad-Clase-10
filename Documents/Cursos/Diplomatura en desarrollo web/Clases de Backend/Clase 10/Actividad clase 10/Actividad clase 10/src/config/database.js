const mongoose = require('mongoose');

// Definimos la función asíncrona para conectar a la base de datos
const connectDB = async () => {
  try {
    // 1. Detectamos el entorno (por defecto 'development')
    const ENV = process.env.NODE_ENV || 'development';

    // 2. Carga dinámica de archivos .env
    try {
      // Modificamos esta condición para que acepte tanto 'development' como 'local_railway'
      if (ENV === 'development' || ENV === 'local_railway') {
        process.loadEnvFile(`.env.${ENV}`);
        console.log(`Configuración cargada desde: .env.${ENV}`);
      }
    } catch (e) {
      // En Railway (producción), no habrá archivos .env locales, así que usará las variables del panel
      console.log('Utilizando variables de entorno del sistema/producción');
    }

    // 3. Extraemos las variables del entorno (ya sea del archivo .env o del panel de Railway)
    const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } = process.env;

    // 4. Limpieza de variables (evita que valores undefined rompan la URL)
    const protocol = DB_PROTOCOL || 'mongodb+srv';
    const user = DB_USER || '';
    const pass = DB_PASS || '';
    const host = DB_HOST || '';
    const dbName = DB_NAME || 'test';
    const options = DB_OPTIONS || '';

    // 5. Construcción de la URI de conexión
    // Estructura: protocolo://usuario:contraseña@host/nombre_bd?opciones
    const MONGODB_URI = `${protocol}://${user}:${pass}@${host}/${dbName}${options}`;

    // 6. Intentamos la conexión con Mongoose
    await mongoose.connect(MONGODB_URI);

    console.log(`✅ Conectado a la base de datos: ${dbName} (Entorno: ${ENV})`);

  } catch (error) {
    console.log('❌ Error al conectarse a la BD:', error.message);
    // Lanzamos el error para que el proceso se detenga si no hay base de datos
    process.exit(1); 
  }
}

module.exports = connectDB;