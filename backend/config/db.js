const mysql = require('mysql2');

// No necesitamos 'path' ni configurar la ruta del .env manualmente.
// Railway inyecta las variables directamente en el sistema.
require('dotenv').config(); 

const connectionString = process.env.DATABASE_URL || process.env.MYSQL_URL;

let pool;

if (connectionString) {
    // Si Railway te da una URL completa (comienza con mysql://)
    pool = mysql.createPool(connectionString);
} else {
    // Si pones las variables por separado en el panel de Railway
    pool = mysql.createPool({
        host: process.env.DB_HOST || process.env.MYSQLHOST,
        port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
        user: process.env.DB_USER || process.env.MYSQLUSER,
        password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
        database: process.env.DB_NAME || process.env.MYSQLDATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

module.exports = pool.promise();
