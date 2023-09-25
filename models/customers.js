const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomersSchema = new Schema(
  {
    // username: { type: String, required: true, unique: true },

    
    Name: { type: String },
    saleman: { type: String },
    address: { type: String },
    note: { type: String },
    ph: { type: String },
    received: { type: Number },
    Total: { type: Number },
    orders: { type: Number },



    payments: [
      {
        bill: { type: String },
        pay: { type: Number },
        date: { type: String },
        note: { type: String },
      },
    ],
  

    date: { type: String },
  },
  {
    timestamps: true,
  }
);

const Customers = mongoose.model("Customers", CustomersSchema);

module.exports = Customers;
