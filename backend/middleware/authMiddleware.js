// backend/middleware/authMiddleware.js

import { jwtSecret } from "../config/config.js"; // Importation de la clé JWT depuis le fichier config.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Pas d'authentification, veuillez vous connecter." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret); // Utilisation de jwtSecret pour valider le token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token invalide." });
  }
};

export default authMiddleware;
