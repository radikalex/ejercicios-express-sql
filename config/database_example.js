const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'nombre_host',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'nombre_baseDatos'
});

db.connect();

module.exports = db;