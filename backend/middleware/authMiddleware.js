// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

// Middleware pour vérifier l'authentification via JWT
const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis l'en-tête Authorization
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // Si aucun token n'est fourni, renvoyer une erreur d'authentification
  if (!token) {
    return res.status(403).json({ message: "Token manquant, accès interdit" });
  }

  try {
    // Vérifier la validité du token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Stocker les informations de l'utilisateur dans la requête
    next(); // Passer au prochain middleware ou à la route
  } catch (error) {
    // Si le token est invalide ou expiré
    console.error("Erreur de validation du token:", error.message);
    return res
      .status(401)
      .json({ message: "Token invalide ou expiré, accès refusé" });
  }
};

module.exports = authMiddleware;
