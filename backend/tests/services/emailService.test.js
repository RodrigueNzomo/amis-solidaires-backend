// tests/services/emailService.test.js
const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const emailService = require("../../backend/services/emailService");
const nodemailer = require("nodemailer");

describe("Email Service", () => {
  it("should send an email", async () => {
    const sendMailStub = sinon
      .stub(nodemailer, "sendMail")
      .resolves("Email sent");

    const result = await emailService.sendEmail(
      "test@example.com",
      "Test Subject",
      "Test Email Content"
    );

    expect(result).to.be.an("object");
    expect(sendMailStub.calledOnce).to.be.true;

    sendMailStub.restore();
  });

  it("should throw an error if email sending fails", async () => {
    const sendMailStub = sinon
      .stub(nodemailer, "sendMail")
      .rejects(new Error("Failed to send email"));

    try {
      await emailService.sendEmail(
        "test@example.com",
        "Test Subject",
        "Test Email Content"
      );
    } catch (err) {
      expect(err.message).to.equal("Erreur lors de l'envoi de l'email");
    }

    sendMailStub.restore();
  });
});
