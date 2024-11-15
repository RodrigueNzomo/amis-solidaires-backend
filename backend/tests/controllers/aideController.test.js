// tests/controllers/aideController.test.js
import chai from "chai";
import { stub } from "sinon";
import request from "supertest";
const { expect } = chai;
import app from "../../backend/app.js"; // Si tu as un fichier app.js pour configurer express
import Aide, { prototype } from "../../backend/models/Aide.js";
import authMiddleware from "../../backend/middleware/authMiddleware.js";

const userId = "userId123"; // ID utilisateur fictif pour l'authentification

describe("Aide Controller", () => {
  describe("POST /api/aides", () => {
    it("should create a new aide", async () => {
      const fakeAide = {
        beneficiaire: userId,
        typeAide: "financière",
        montant: 1000,
        description: "Aide pour l'éducation",
      };

      const createAideStub = stub(prototype, "save").resolves(fakeAide);

      const res = await request(app)
        .post("/api/aides")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send(fakeAide);

      expect(res.status).to.equal(201);
      expect(res.body).to.include(fakeAide);

      createAideStub.restore();
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/aides")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send({});

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("Données invalides");
    });
  });

  describe("GET /api/aides", () => {
    it("should return all aides", async () => {
      const fakeAides = [
        { typeAide: "financière", montant: 1000 },
        { typeAide: "santé", montant: 500 },
      ];

      const findAidesStub = stub(Aide, "find").resolves(fakeAides);

      const res = await request(app)
        .get("/api/aides")
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(fakeAides);

      findAidesStub.restore();
    });
  });
});
