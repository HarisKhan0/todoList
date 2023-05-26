const mongoose = require("mongoose");
const credentialModel = require("./credential");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1/credentials", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// Returns all credentials
async function getCredentials() {
  return await credentialModel.find();
}

// Returns credential with username, used for creating unique username accounts
//async function findCredentialsByUsername(username) {
//  return await credentialModel.find({ username: username });
//}

// Return a credential with id
async function findCredentialById(id) {
  try {
    return await credentialModel.findCredentialById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

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
exports.findCredentialById = findCredentialById;
exports.addCredential = addCredential;
exports.deleteCredentialById = deleteCredentialById;
