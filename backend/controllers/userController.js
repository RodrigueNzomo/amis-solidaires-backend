// backend/controllers/userController.js
import User from "../models/User.js"; // Import du modèle User

// Récupérer les détails d'un utilisateur
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Erreur du serveur", error: err.message });
  }
};

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Erreur du serveur", error: err.message });
  }
};

export default {
  getUserDetails,
  getAllUsers,
};
