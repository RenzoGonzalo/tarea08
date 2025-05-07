const jwt = require("jsonwebtoken");

const token = jwt.sign({ id: 7 }, "jwt-secret-key", { expiresIn: 86400 });
console.log("Token:", token);
