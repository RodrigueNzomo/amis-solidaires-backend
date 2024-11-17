import { sign, verify } from "jsonwebtoken"; // Importation des méthodes sign et verify de jsonwebtoken
import { JWT_SECRET, JWT_EXPIRATION } from "./config.js"; // Importation des paramètres JWT

// Fonction pour générer un token JWT
const generateToken = (userId) => {
  return sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION }); // Création du token avec l'expiration et la clé secrète
};

// Fonction pour vérifier la validité d'un token JWT
const verifyToken = (token) => {
  try {
    return verify(token, JWT_SECRET); // Vérification du token avec la clé secrète
  } catch (error) {
    throw new Error("Token invalide ou expiré"); // Gestion de l'erreur si le token est invalide ou expiré
  }
};

export default { generateToken, verifyToken }; // Exportation des fonctions pour les utiliser ailleurs
