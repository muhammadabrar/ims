const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
  {
    // username: { type: String, required: true, unique: true },

    Total: { type: Number },
    stock: { type: Number },
    month: { type: String },
    items: [
      {

        price: { type: Number },
        retail: { type: Number },
        qty: { type: Number },
        Total: { type: Number },
        unit: { type: String },
        title: { type: String },
      },
    ],
    customer_id: { type: String },
    Name: { type: String },
    received: { type: Number },
    ph: { type: String },
    order: { type: String },
    date: { type: String },

  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = Orders;
