const credentialServices = require("../models/credential-services");
const db = require("./db");

beforeAll(async () => {
  await db.connectTempDataBase();
});

afterEach(async () => {
  await db.clearTempDatabase();
});

afterAll(async () => {
  await db.closeTempDatabase();
});

describe("Credential created", () => {
  it("Add credential works", async () => {
    const credentialInput = {
      username: "myusername",
      password: "password123",
    };

    await credentialServices.addCredential(credentialInput);

    const result = await credentialServices.getCredentials();

    expect(result[0].username).toBe("myusername");
  });

  it("Add credential errors", async () => {
    const credentialInput = {
      field: "tree",
    };

    const result = await credentialServices.addCredential(credentialInput);

    expect(result).toBeFalsy();
  });

  it("Delete credential by ID works", async () => {
    const credentialInput = {
      username: "myusername",
      password: "password123",
    };

    await credentialServices.addCredential(credentialInput);

    const credentials = await credentialServices.getCredentials();

    const firstCredential = credentials[0];

    const firstCredentialID = firstCredential._id;

    const deletedCredential = await credentialServices.deleteCredentialById(
      firstCredentialID
    );

    expect(firstCredential).toEqual(deletedCredential);
  });

  it("Delete credential by ID errors", async () => {
    const deletedCredential = await credentialServices.deleteCredentialById(
      "1"
    );

    expect(deletedCredential).toEqual(undefined);
  });
});
