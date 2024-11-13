// tests/controllers/userController.test.js
const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const { expect } = chai;
const app = require("../../backend/app"); // Assure-toi que ce chemin est correct
const User = require("../../backend/models/User");

const userId = "userId123"; // ID utilisateur fictif pour l'authentification

describe("User Controller", () => {
  describe("GET /api/users/:id", () => {
    it("should return user details", async () => {
      const fakeUser = {
        name: "John Doe",
        email: "john.doe@example.com",
      };

      const findUserStub = sinon.stub(User, "findById").resolves(fakeUser);

      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(200); // Vérification que la réponse est correcte
      expect(res.body).to.deep.equal(fakeUser); // Vérification que l'utilisateur retourné est correct

      findUserStub.restore(); // Restauration de la méthode originale
    });

    it("should return 404 if user not found", async () => {
      const findUserStub = sinon.stub(User, "findById").resolves(null); // Simuler un utilisateur non trouvé

      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(404); // Vérification du statut 404 pour non trouvé
      expect(res.body.message).to.equal("Utilisateur non trouvé"); // Message d'erreur

      findUserStub.restore(); // Restauration de la méthode originale
    });
  });

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const fakeUsers = [
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Smith", email: "jane.smith@example.com" },
      ];

      const findUsersStub = sinon.stub(User, "find").resolves(fakeUsers);

      const res = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(200); // Vérification que la réponse est correcte
      expect(res.body).to.deep.equal(fakeUsers); // Vérification que les utilisateurs retournés sont corrects

      findUsersStub.restore(); // Restauration de la méthode originale
    });
  });
});
