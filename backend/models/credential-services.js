const credentialModel = require("./credential");

// Returns all credentials
async function getCredentials() {
  return await credentialModel.find();
}

// Returns credential with username, used for creating unique username accounts
//async function findCredentialsByUsername(username) {
//  return await credentialModel.find({ username: username });
//}

// Stores a credential
async function addCredential(credential) {
  try {
    const credentialToAdd = new credentialModel(credential);
    const savedCredential = await credentialToAdd.save();
    return savedCredential;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteCredentialById(id) {
  try {
    return await credentialModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

exports.getCredentials = getCredentials;
exports.addCredential = addCredential;
exports.deleteCredentialById = deleteCredentialById;
