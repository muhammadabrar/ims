const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventoriesSchema = new Schema(
  {
    // username: { type: String, required: true, unique: true },

    
    title: { type: String },
    qty: { type: Number },
    price: { type: Number },
    retail: { type: Number },
    sold: { type: Number },

    date: { type: String },
  },
  {
    timestamps: true,
  }
);

const Inventories = mongoose.model("Inventories", InventoriesSchema);

module.exports = Inventories;
