const db = require('../../models');
const User = db.user;
const Role = db.role;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user) return res.status(400).send({ message: 'El usuario ya existe.' });

  const email = await User.findOne({ where: { email: req.body.email } });
  if (email) return res.status(400).send({ message: 'El correo ya está en uso.' });

  next();
};

checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    // Validamos que cada rol exista en la base de datos
    for (let roleName of req.body.roles) {
      try {
        const role = await Role.findOne({ where: { name: roleName } });

        if (!role) {
          // Si algún rol no existe, respondemos con un error
          return res.status(400).send({ message: `Rol no válido: ${roleName}` });
        }
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    }
  }
  next(); // Si todo está bien, pasamos al siguiente middleware
};

module.exports = { checkRolesExisted };
const verifySignUp = { checkDuplicateUsernameOrEmail, checkRolesExisted };
module.exports = verifySignUp;
