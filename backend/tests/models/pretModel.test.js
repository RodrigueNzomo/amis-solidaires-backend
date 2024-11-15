// tests/models/pretModel.test.js
import chai from "chai";
import { stub } from "sinon";
const { expect } = chai;
import Pret, { prototype } from "../../backend/models/Pret.js";
import { connectDB, disconnectDB, resetDB } from "../testUtils/testDB";

describe("Pret Model", () => {
  // Avant tous les tests, connecter à la DB en mémoire
  before(async () => {
    await connectDB();
  });

  // Avant chaque test, réinitialiser la base de données
  beforeEach(async () => {
    await resetDB();
  });

  // Après tous les tests, déconnecter de la DB en mémoire
  after(async () => {
    await disconnectDB();
  });

  it("should create a new pret with valid data", async () => {
    const fakePret = {
      beneficiaire: "userId123",
      montant: 5000,
      interet: 5,
      duree: 12,
      statut: "actif",
    };

    const createPretStub = stub(prototype, "save").resolves(fakePret);

    const pret = new Pret(fakePret);
    await pret.save();

    expect(createPretStub.calledOnce).to.be.true;
    expect(pret.montant).to.equal(5000);
    expect(pret.statut).to.equal("actif");

    createPretStub.restore();
  });

  it("should throw an error if required fields are missing", async () => {
    const fakePret = {
      beneficiaire: "userId123",
      montant: null, // Missing montant
    };

    try {
      const pret = new Pret(fakePret);
      await pret.save();
    } catch (error) {
      expect(error.errors.montant).to.exist;
    }
  });

  it("should validate the 'duree' field", async () => {
    const fakePret = {
      beneficiaire: "userId123",
      montant: 5000,
      interet: 5,
      duree: 0, // Invalid duree
    };

    try {
      const pret = new Pret(fakePret);
      await pret.save();
    } catch (error) {
      expect(error.errors.duree).to.exist; // Should catch the validation error
    }
  });
});
