const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "item" },
  deliveryStatus: { type: String, default: "Pending confirmation" },
});

PurchaseSchema.virtual("item", {
  foreignField: "_id",
  localField: "itemId",
  justOne: true,
  ref: "item",
});

PurchaseSchema.virtual("user", {
  foreignField: "_id",
  localField: "userId",
  justOne: true,
  ref: "user",
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);

module.exports = Purchase;
