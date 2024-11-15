import request from "supertest";
import app from "../app"; // Assure-toi que le fichier app.js est correctement importé
import { connect, disconnect } from "mongoose";
import User, { deleteMany } from "../models/User"; // Assure-toi que le chemin est correct

// Connecte-toi à la base de données avant chaque test
beforeAll(async () => {
  const dbUri = "mongodb://localhost:27017/amisSolidaires_test"; // Utilise une base de données de test
  await connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Déconnecte la base de données après tous les tests
afterAll(async () => {
  await disconnect();
});

// Réinitialise la base de données avant chaque test pour éviter les conflits de données
beforeEach(async () => {
  await deleteMany();
});

// Test pour créer un utilisateur
describe("POST /api/users", () => {
  it("devrait créer un nouvel utilisateur", async () => {
    const newUser = {
      email: "testuser@example.com",
      password: "testpassword123",
      name: "Test User",
      dateOfBirth: "1990-01-01",
    };

    const response = await request(app)
      .post("/api/users") // Change cette URL en fonction de tes routes
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email", newUser.email);
    expect(response.body).toHaveProperty("name", newUser.name);
  });
});

// Test pour récupérer un utilisateur par ID
describe("GET /api/users/:id", () => {
  it("devrait récupérer un utilisateur par ID", async () => {
    const user = new User({
      email: "getuser@example.com",
      password: "password123",
      name: "Get User",
      dateOfBirth: "1995-05-05",
    });

    await user.save();

    const response = await request(app)
      .get(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${process.env.JWT_SECRET}`); // Si tu utilises un token JWT pour l'authentification

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", user.email);
  });
});

// Test pour modifier un utilisateur
describe("PUT /api/users/:id", () => {
  it("devrait mettre à jour les informations d'un utilisateur", async () => {
    const user = new User({
      email: "updateuser@example.com",
      password: "updatepassword123",
      name: "Update User",
      dateOfBirth: "1992-03-03",
    });

    await user.save();

    const updatedUser = {
      name: "Updated User",
    };

    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .send(updatedUser)
      .set("Authorization", `Bearer ${process.env.JWT_SECRET}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", updatedUser.name);
  });
});

// Test pour supprimer un utilisateur
describe("DELETE /api/users/:id", () => {
  it("devrait supprimer un utilisateur", async () => {
    const user = new User({
      email: "deleteuser@example.com",
      password: "deletepassword123",
      name: "Delete User",
      dateOfBirth: "1993-07-07",
    });

    await user.save();

    const response = await request(app)
      .delete(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${process.env.JWT_SECRET}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Utilisateur supprimé avec succès");
  });
});
