// config/db.config.js
export default {
  HOST: "host",
  USER: "renzo",
  PASSWORD: "123456789",           // Vacío por defecto en XAMPP
  DB: "07",          // Asegúrate de que esta base de datos exista
  PORT: 3306,             // ✅ SIN comillas, debe ser número
  dialect: "mysql",       // ✅ Está bien: Sequelize usa "mysql" también para MariaDB
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};
