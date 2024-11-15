// backend/tests/userRoutes.test.js

import request from "supertest";
import app from "../app"; // Importer l'application Express
import { connect, connection } from "mongoose";
import { create } from "../models/User.js"; // Modèle de l'utilisateur

// Créer un utilisateur pour les tests
const userData = {
  name: "Test User",
  email: "testuser@example.com",
  password: "password123", // Le mot de passe ne sera pas testé directement ici
};

let token;
let userId;

// Avant tous les tests, démarrer la base de données et créer un utilisateur
beforeAll(async () => {
  // Connexion à la base de données
  await connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Créer un utilisateur
  const user = await create(userData);
  userId = user._id;

  // Créer un token JWT pour l'authentification
  token = "Bearer " + user.generateAuthToken(); // Assurer que `generateAuthToken` est une méthode du modèle User
});

// Après tous les tests, fermer la connexion à la base de données
afterAll(async () => {
  await connection.close();
});

describe("User Routes", () => {
  // Test de la route GET /api/users/:id (récupérer un utilisateur par ID)
  it("devrait récupérer un utilisateur", async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", userData.email);
    expect(response.body).toHaveProperty("name", userData.name);
  });

  // Test de la route GET /api/users (récupérer tous les utilisateurs)
  it("devrait récupérer tous les utilisateurs", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test de la route PUT /api/users/:id (modifier un utilisateur)
  it("devrait modifier un utilisateur", async () => {
    const updatedData = {
      name: "Updated User",
    };

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", token)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", updatedData.name);
  });

  // Test de la route DELETE /api/users/:id (supprimer un utilisateur)
  it("devrait supprimer un utilisateur", async () => {
    const response = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Utilisateur supprimé avec succès"
    );
  });

  // Test de la gestion des erreurs avec un mauvais ID
  it("devrait retourner une erreur 404 pour un utilisateur non trouvé", async () => {
    const response = await request(app)
      .get("/api/users/invalidid")
      .set("Authorization", token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Utilisateur non trouvé");
  });
});
