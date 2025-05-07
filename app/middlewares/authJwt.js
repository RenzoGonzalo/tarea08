const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config');
const db = require('../../models');
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    console.log('No token provided!');
    return res.status(403).send({ message: 'No token provided!' });
  }

  console.log('Token received:', token);


  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    console.log('Decoded token:', decoded);  // Esto debería mostrar el id del usuario
    req.userId = decoded.id;
    next();
  });
  
  console.log("🔐 Clave usada para verificar:", config.secret);

};



isAdmin = (req, res, next) => {
  User.findByPk(req.userId, {
    include: {
      model: Role,
      through: { attributes: [] },  // No necesitamos los campos intermedios
    }
  }).then(user => {
    if (!user) {
      console.log('User not found');
      return res.status(404).send({ message: 'User Not found.' });
    }

    // Mostrar roles obtenidos
    console.log('User roles:', user.roles);

    // Verificar si el usuario tiene el rol "admin"
    const roles = user.roles.map(role => role.name);
    console.log('Roles of user:', roles);  // Mostrar los roles del usuario

    if (roles.includes('admin')) {
      next(); // Si tiene el rol admin, permite el acceso
    } else {
      res.status(403).send({ message: 'Require Admin Role!' });
    }
  }).catch(err => {
    console.log('Error while finding user or roles:', err);
    res.status(500).send({ message: err.message });
  });
};


isModerator = (req, res, next) => {
  User.findByPk(req.userId, {
    include: {
      model: Role,
      through: { attributes: [] },  // No necesitamos los campos intermedios
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    // Verificar si el usuario tiene el rol "moderator"
    const roles = user.roles.map(role => role.name);
    if (roles.includes('moderator')) {
      next(); // Si tiene el rol moderator, permite el acceso
    } else {
      res.status(403).send({ message: 'Require Moderator Role!' });
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

module.exports = authJwt;
