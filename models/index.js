const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',  // Ajusta estos valores según tu configuración de MySQL
  username: 'root',
  password: '',
  database: '07'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importando los modelos
db.user = require('./user.model')(sequelize, DataTypes);
db.role = require('./role.model')(sequelize, DataTypes);

// Estableciendo la relación entre User y Role
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
});

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
});

module.exports = db;
