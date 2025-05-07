const db = require('../models');

module.exports = async () => {
  const Role = db.role;
  await Role.create({ id: 1, name: 'user' });
  await Role.create({ id: 2, name: 'moderator' });
  await Role.create({ id: 3, name: 'admin' });
};
