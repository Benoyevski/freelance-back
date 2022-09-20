const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  categoryId: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
  creator: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  price: Number,

  freelancers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  accepted: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],

  text: String,
  workTime: String,

  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
