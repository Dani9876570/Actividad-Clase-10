// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Extraemos las variables que ya cargamos en el index.js
    const { 
      DB_PROTOCOL, 
      DB_USER, 
      DB_PASS, 
      DB_HOST, 
      DB_NAME, 
      DB_OPTIONS 
    } = process.env;

    // 2. Construimos la URI de conexión
    // Importante: No ponemos valores por defecto vacíos aquí para que, si falta algo, 
    // el error sea claro y sepamos qué variable falta.
    const url = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}${DB_OPTIONS}`;

    // 3. Intentamos la conexión
    const conn = await mongoose.connect(url);

    console.log(`✅ Conexión exitosa a MongoDB: ${conn.connection.host}`);
    console.log(`📂 Base de datos activa: ${DB_NAME}`);

  } catch (error) {
    // Si algo sale mal, mostramos el error detallado
    console.error('❌ Error al conectarse a la BD:', error.message);
    
    // Matamos el proceso con código 1 (error) para que el servidor no quede "colgado"
    process.exit(1);
  }
};

module.exports = connectDB;