const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Uncomment the following to debug mongoose queries, etc.
//mongoose.set("debug", true);

async function connect() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));
}

exports.connect = connect;
