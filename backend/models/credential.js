const mongoose = require("mongoose");

// TODO make username unique
const CredentialSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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

// TODO check save
CredentialSchema.pre("save", function (next) {
  next();
});

const Credential = mongoose.model("Credential", CredentialSchema);

module.exports = Credential;
