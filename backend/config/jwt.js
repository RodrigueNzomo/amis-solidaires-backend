// backend/config/jwt.js

import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "./config";

// Fonction pour générer un token JWT
const generateToken = (userId) => {
  return sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Fonction pour vérifier un token JWT
const verifyToken = (token) => {
  return verify(token, JWT_SECRET);
};

export default { generateToken, verifyToken };
