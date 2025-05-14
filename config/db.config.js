module.exports = {
  HOST: "dpg-d0hroceuk2gs73891lsg-a",       
  USER: "root",                             
  PASSWORD: "ZYLftvSaTWj3xIOeDkmx1fAtxR5E9Cz0", 
  DB: "auth_db_k52s",                       
  PORT: 5432,                               
  dialect: "postgres",                      
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};
