const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "credential_list" }
);

// TODO save?

const Credential = mongoose.model("Credential", credentialSchema);

module.exports = Credential;
