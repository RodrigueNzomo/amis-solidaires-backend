// backend/controllers/userController.js
import { findById, find } from "../models/User.js";

// Récupérer les détails d'un utilisateur
const getUserDetails = async (req, res) => {
  try {
    const user = await findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

export default {
  getUserDetails,
  getAllUsers,
};
