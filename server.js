const express = require('express');
const cors = require('cors');
const db = require('./models');
const initialSetup = require('./utils/initialSetup');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Sincronización con la base de datos y setup inicial
db.sequelize.sync({ alter: true }) // Usa { alter: true } para ajustar modelos sin borrar datos
  .then(() => {
    console.log('✅ Base de datos sincronizada correctamente');

    // Setup inicial de roles si no existen
    return db.role.count();
  })
  .then(count => {
    if (count === 0) {
      console.log('🔧 Insertando roles iniciales...');
      return initialSetup();
    }
  })
  .catch(err => {
    console.error('❌ Error al sincronizar la base de datos:', err.message);
    process.exit(1); // Detiene la app si falla la conexión
  });

// Puerto del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
