// tests/models/cotisationModel.test.js
const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const Cotisation = require("../../backend/models/Cotisation");
const { connectDB, disconnectDB, resetDB } = require("../testUtils/testDB");

describe("Cotisation Model", () => {
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

  it("should create a new cotisation with valid data", async () => {
    const fakeCotisation = {
      membre: "userId123",
      montant: 1000,
      statut: "payé",
    };

    const createCotisationStub = sinon
      .stub(Cotisation.prototype, "save")
      .resolves(fakeCotisation);

    const cotisation = new Cotisation(fakeCotisation);
    await cotisation.save();

    expect(createCotisationStub.calledOnce).to.be.true;
    expect(cotisation.montant).to.equal(1000);
    expect(cotisation.statut).to.equal("payé");

    createCotisationStub.restore();
  });

  it("should throw an error if required fields are missing", async () => {
    const fakeCotisation = {
      membre: "userId123",
      montant: null, // Missing montant
    };

    try {
      const cotisation = new Cotisation(fakeCotisation);
      await cotisation.save();
    } catch (error) {
      expect(error.errors.montant).to.exist;
    }
  });

  it("should validate the 'statut' field", async () => {
    const fakeCotisation = {
      membre: "userId123",
      montant: 1000,
      statut: "invalid", // Invalid statut
    };

    try {
      const cotisation = new Cotisation(fakeCotisation);
      await cotisation.save();
    } catch (error) {
      expect(error.errors.statut).to.exist;
    }
  });
});
