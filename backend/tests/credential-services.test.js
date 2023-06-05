const credentialModel = require("../models/credential.js");
const {
  getCredentials,
  findCredentialById,
} = require('../models/credential-services.js');

jest.mock("../models/credential.js", () => ({
  find: jest.fn(),
  findCredentialById: jest.fn(),
}));

describe("Credential Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCredentials", () => {
    it("should return all credentials", async () => {
      const mockCredentials = [
        { username: "user1", password: "pass1" },
        { username: "user2", password: "pass2" },
      ];
      credentialModel.find.mockResolvedValue(mockCredentials);

      const result = await getCredentials();

      expect(credentialModel.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCredentials);
    });

    it("should handle errors", async () => {
      credentialModel.find.mockRejectedValue(new Error("Test error"));

      const result = await getCredentials();

      expect(credentialModel.find).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
      expect(console.log).toHaveBeenCalledWith(
        new Error("Test error")
      );
    });
  });

  describe("findCredentialById", () => {
    it("should return a credential with the specified ID", async () => {
      const mockCredential = {
        id: "123",
        username: "user1",
        password: "pass1",
      };
      const mockId = "123";
      credentialModel.findCredentialById.mockResolvedValue(mockCredential);

      const result = await findCredentialById(mockId);

      expect(credentialModel.findCredentialById).toHaveBeenCalledTimes(1);
      expect(credentialModel.findCredentialById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockCredential);
    });

    it("should handle errors", async () => {
      const mockId = "123";
      credentialModel.findCredentialById.mockRejectedValue(
        new Error("Test error")
      );

      const result = await findCredentialById(mockId);

      expect(credentialModel.findCredentialById).toHaveBeenCalledTimes(1);
      expect(credentialModel.findCredentialById).toHaveBeenCalledWith(mockId);
      expect(result).toBeUndefined();
      expect(console.log).toHaveBeenCalledWith(
        new Error("Test error")
      );
    });
  });
});
