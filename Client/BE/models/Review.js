const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "item" },
  comment: { type: String, required: true },
  rating: { type: mongoose.Schema.Types.Number, required: true },
});

ReviewSchema.virtual("item", {
  foreignField: "_id",
  localField: "itemId",
  justOne: true,
  ref: "item",
});

ReviewSchema.virtual("user", {
  foreignField: "_id",
  localField: "userId",
  justOne: true,
  ref: "user",
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
