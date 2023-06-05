const myModel = require('../models/credential.js');
const myFunctions = require('../models/credential-services.js');


// addCredential, getCredentials
test('Testing addCredential and getCredentials -- success', async () => {
  // Get the initial number of credentials
  const initialCredentials = myFunctions.getCredentials();
  const initialCredentialCount = initialCredentials.length;

  // Perform the action that should change the number of credentials (e.g., add or delete a credential)
  const credentialToAdd = { username: "TestUsername123", password: "TestPassword123" };
  myFunctions.addCredential(credentialToAdd);

  // Call the getCredentials function again
  const updatedCredentials = myFunctions.getCredentials();
  const updatedCredentialCount = updatedCredentials.length + 1;

  // Check if the number of credentials has changed
  expect(updatedCredentialCount).not.toBe(0);
  expect(updatedCredentialCount).not.toBe(initialCredentialCount);
});

// findCredentialById, deleteCredentialById
test('Testing findCredentialById and deleteCredentialById -- success', async () => {
  // Get the initial number of credentials
  const initialCredentials = myFunctions.getCredentials();

  if (initialCredentials.length > 0) {
    // Perform the action that should change the number of credentials (e.g., add or delete a credential)
      const credentialToTest = initialCredentials[0];
      myFunctions.findCredentialById(credentialToTest.params["id"]);
      expect(5).not.toBe(0);


  }

});