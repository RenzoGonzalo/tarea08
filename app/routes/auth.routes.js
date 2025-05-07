const verifySignUp = require('../middlewares/verifySignUp');
const authController = require('../controllers/auth.controller');

module.exports = function(app) {
  app.post('/api/auth/signup', [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ], authController.signup);

  app.post('/api/auth/signin', authController.signin);
};
