export default {
  HOST: "dpg-d0hroceuk2gs73891lsg-a",       // Host interno para conexión desde Render
  USER: "root",                             // Tu usuario
  PASSWORD: "ZYLftvSaTWj3xIOeDkmx1fAtxR5E9Cz0", // Tu contraseña segura
  DB: "auth_db_k52s",                       // Nombre exacto de la base de datos
  PORT: 5432,                               // Puerto estándar para PostgreSQL
  dialect: "postgres",                      // Dialecto para Sequelize
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};
