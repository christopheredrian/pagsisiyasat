// Logic

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
  // we are in production
} else {
  // return dev keys
  module.exports = require("./dev");
}
