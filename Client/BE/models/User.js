const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  password: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  phone: { required: true, type: String },
  googleMapAddress: { required: true, type: String },
  address: { required: true, type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "purchase" }],
  profilePicturePath: { type: String, default: "default" },
  secret2FactorAuth: { required: true, type: String },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
