const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");

async function AuthUser(request, response, next) {
  try {
    const isDecoded = await jsonwebtoken.verify(
      request.headers.token,
      process.env.JWT_SECRET
    );

    if (!isDecoded) {
      response.status(401).send();
      return;
    }

    const foundUser = await User.findById(isDecoded._id)
      .select("-password")
      .select("-purchases")
      .select("-reviews")
      .select("-secret2FactorAuth");

    if (foundUser === null) {
      response.status(401).send();
      return;
    }
    request.user = { ...foundUser._doc };
  } catch (err) {
    response.status(401).send();
    console.log(err);
  }
}
module.exports = AuthUser;
