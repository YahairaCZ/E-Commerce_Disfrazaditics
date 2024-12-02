const mysql = require("mysql2");

// Crear un pool de conexiones para manejar múltiples solicitudes
  const pool = mysql.createPool({
  host: process.env.DB_HOST,      // Dirección del servidor de la base de datos
  user: process.env.DB_USER,      // Usuario de la base de datos
  password: process.env.DB_PASSWORD,  // Contraseña del usuario
  database: process.env.DB_NAME,      // Nombre de la base de datos
  port: process.env.DB_PORT || 3306,  // Puerto del servidor MySQL (por defecto 3306)
  waitForConnections: true,           // Manejo eficiente de conexiones
  connectionLimit: 10,                // Máximo de conexiones simultáneas
  queueLimit: 0                       // Sin límite de solicitudes en espera
});
pool.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Error al conectarse a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos establecida");
  }
});

// Exportar el pool con soporte de promesas para usar con async/await
module.exports = pool.promise();
