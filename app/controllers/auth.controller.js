const db = require('../../models');
const config = require('../../config/auth.config');
const User = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    // Crear el nuevo usuario
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    if (req.body.roles) {
      // Si se envían roles, los buscamos por su nombre
      const roles = await Role.findAll({
        where: {
          name: req.body.roles
        }
      });

      // Si no se encuentran roles, devolvemos un error
      if (roles.length === 0) {
        return res.status(400).send({ message: "Uno o más roles no existen." });
      }

      // Establecemos los roles en la tabla intermedia `user_roles`
      await user.setRoles(roles);
    } else {
      // Si no se especifican roles, se asigna el rol de 'user' por defecto (ID 1)
      await user.setRoles([1]);
    }

    // Respuesta de éxito
    res.send({ message: 'Usuario registrado exitosamente.' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    });

    if (!user) return res.status(404).send({ message: 'Usuario no encontrado.' });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Contraseña incorrecta.'
      });
    }
    
    console.log("🔐 Clave usada para firmar:", config.secret);

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 horas
    });

    const roles = await user.getRoles();
    const authorities = roles.map(role => 'ROLE_' + role.name.toUpperCase());

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
