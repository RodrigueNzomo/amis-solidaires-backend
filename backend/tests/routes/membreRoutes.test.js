// tests/routes/membreRoutes.test.js
const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const { expect } = chai;
const app = require("../../backend/app");
const Membre = require("../../backend/models/Membre");

describe("Membre Routes", () => {
  describe("POST /api/membres", () => {
    it("should create a new membre", async () => {
      const fakeMembre = {
        nom: "John",
        prenom: "Doe",
        email: "john.doe@example.com",
        adresse: "123 Rue Example",
        telephone: "0123456789",
      };

      const createMembreStub = sinon
        .stub(Membre.prototype, "save")
        .resolves(fakeMembre);

      const res = await request(app)
        .post("/api/membres/ajouter")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send(fakeMembre);

      expect(res.status).to.equal(201);
      expect(res.body).to.include(fakeMembre);

      createMembreStub.restore();
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/membres/ajouter")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send({});

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("Données invalides");
    });
  });

  describe("GET /api/membres", () => {
    it("should return all membres", async () => {
      const fakeMembres = [
        { nom: "John", prenom: "Doe", email: "john.doe@example.com" },
        { nom: "Jane", prenom: "Smith", email: "jane.smith@example.com" },
      ];

      const findMembresStub = sinon.stub(Membre, "find").resolves(fakeMembres);

      const res = await request(app)
        .get("/api/membres")
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(fakeMembres);

      findMembresStub.restore();
    });
  });
});
