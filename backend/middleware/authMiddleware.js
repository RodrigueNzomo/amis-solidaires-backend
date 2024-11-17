import { verifyToken } from "../config/jwt.js"; // Utilisation de la fonction JWT pour valider le token

// Middleware pour vérifier l'authentification de l'utilisateur
const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token"); // Récupération du token depuis l'en-tête de la requête

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Pas d'authentification, veuillez vous connecter." }); // Si aucun token n'est fourni
  }

  try {
    const decoded = verifyToken(token); // Vérification du token via la fonction importée
    req.user = decoded.user; // Ajout de l'utilisateur décodé dans la requête
    next(); // Passage au middleware suivant
  } catch (err) {
    res.status(401).json({ msg: "Token invalide." }); // Gestion de l'erreur en cas de token invalide
  }
};

export default authMiddleware; // Exportation du middleware pour l'utiliser dans les routes
