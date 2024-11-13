// backend/config/jwt.js

const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION } = require("./config");

// Fonction pour générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Fonction pour vérifier un token JWT
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
