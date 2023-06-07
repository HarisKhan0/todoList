const mongoose = require("mongoose");

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

CredentialSchema.pre("save", function (next) {
  next();
});

const Credential = mongoose.model("Credential", CredentialSchema);

module.exports = Credential;
