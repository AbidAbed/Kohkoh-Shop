const User = require("../models/User");
const bcrypt = require("bcrypt");
const GenerateSecret = require("../utils/GenerateSecret");
const jwt = require("jsonwebtoken");
const OTPAuth = require("otpauth");

async function postLoginUser(request, response) {
  try {
    const foundUser = await User.findOne({ email: request.body.email });

    if (foundUser === null) {
      response.status(404).send();
      return;
    }

    const isTheSame = await bcrypt.compare(
      request.body.password,
      foundUser.password
    );

    if (!isTheSame) {
      response.status(401).send();
      return;
    }

    let totp = new OTPAuth.TOTP({
      issuer: process.env.DOMAIN_NAME,
      label: process.env.LABEL,
      algorithm: "SHA1",
      digits: 6,
      secret: foundUser.secret2FactorAuth,
    });

    let delta = totp.validate({ token: request.body.otp_code });

    if (delta === null) {
      response.status(401).send();
      return;
    }

    token = await jwt.sign(foundUser._id, process.env.JWT_SECRET);
    response.status(200).send({ token: token });
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
}

async function postSignupUser(request, response) {
  try {
    const isUserExist = await User.findOne({ email: request.body.email });

    if (isUserExist !== null) {
      response.status(400).send();
      return;
    }

    const base32_secret = GenerateSecret();

    const hashedPassword = await bcrypt.hash(
      request.body.password,
      process.env.HASH_SALT_ROUNDS
    );

    const createdUser = await User.create({
      ...request.body,
      password: hashedPassword,
      secret2FactorAuth: base32_secret,
    });

    const filteredCreatedUser = await User.findById(createdUser._id)
      .select("-password")
      .select("-secret2FactorAuth")
      .select("-reviews")
      .select("-purchases");

    response.status(200).send({ ...filteredCreatedUser._doc });
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
}

async function postAuthUser(request, response) {
  try {
    const isDecoded = await jwt.verify(
      request.headers.token,
      process.env.JWT_SECRET
    );

    if (!isDecoded) {
      response.status(401).send();
      return;
    }

    const loggedInUser = await User.findById(isDecoded._id)
      .select("-password")
      .select("-purchases")
      .select("-reviews")
      .select("-secret2FactorAuth");

    response.status(200).send({ ...loggedInUser._doc });
  } catch (error) {
    console.log(error);
    response.status(401).send();
  }
}

async function putUser(request, response) {
  try {
    if (request.body.password) {
      hashedPassword = await bcrypt.hash(
        request.body.password,
        process.env.HASH_SALT_ROUNDS
      );
      request.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(request.user._id, {
      ...request.body,
    });

    const updatedFoundUser = await User.findById(updatedUser._id)
      .select("-password")
      .select("-purchases")
      .select("-reviews")
      .select("-secret2FactorAuth");

    response.status(200).send({ ...updatedFoundUser._doc });
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
}

//NO NEED
async function postLogoutUser(request, response) {
  try {

  } catch (error) {
    
    console.log(error);
    
    response.status(500).send();

  }

}

module.exports = {
  postLoginUser,
  postSignupUser,
  putUser,
  postAuthUser,
  postLogoutUser,
};
