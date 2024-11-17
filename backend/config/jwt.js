// backend/config/jwt.js

import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "./config.js"; // Correction ici

// Fonction pour générer un token JWT
const generateToken = (userId) => {
  return sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Fonction pour vérifier un token JWT
const verifyToken = (token) => {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Token invalide ou expiré");
  }
};

export default { generateToken, verifyToken };
