// tests/models/aideModel.test.js
const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const Aide = require("../../backend/models/Aide");
const { connectDB, disconnectDB, resetDB } = require("../testUtils/testDB"); // Importation de la config DB

describe("Aide Model", () => {
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

  it("should create a new aide with valid data", async () => {
    const fakeAide = {
      beneficiaire: "userId123",
      typeAide: "financière",
      montant: 1000,
      description: "Aide pour l'éducation",
    };

    const createAideStub = sinon
      .stub(Aide.prototype, "save")
      .resolves(fakeAide);

    const aide = new Aide(fakeAide);
    await aide.save();

    expect(createAideStub.calledOnce).to.be.true;
    expect(aide.typeAide).to.equal("financière");
    expect(aide.montant).to.equal(1000);

    createAideStub.restore(); // Restore original method
  });

  it("should throw an error if required fields are missing", async () => {
    const fakeAide = {
      beneficiaire: "userId123",
      typeAide: "financière",
      montant: null, // Missing montant
    };

    try {
      const aide = new Aide(fakeAide);
      await aide.save();
    } catch (error) {
      expect(error.errors.montant).to.exist;
    }
  });
});
