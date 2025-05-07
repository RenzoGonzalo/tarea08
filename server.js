const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const initialSetup = require("./utils/initialSetup");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


// Sincronización de la base de datos
db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
});


db.role.count().then(count => {
  if (count === 0) {
    initialSetup();
  }
});

// Levantar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


