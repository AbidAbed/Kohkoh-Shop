const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { required: true, type: String },
  description: { required: true, type: String },
  images: [{ type: String }],
  price: { required: true, type: mongoose.Schema.Types.Number },
  availableAmmount: { required: true, type: mongoose.Schema.Types.Number },
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "purchase" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
