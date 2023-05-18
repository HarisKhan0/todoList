const mongoose = require("mongoose");
const credentialModel = require("./credential");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1/credentials", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getCredentials(username) {
  let result;
  result = await findCredentialsByUsername(username);
  return result;
}

async function findById(id) {
  try {
    return await credentialModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findCredentialsByUsername(username) {
  return await credentialModel.find({ username: username });
}

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
exports.findById = findById;
exports.addCredential = addCredential;
exports.deleteCredentialById = deleteCredentialById;
