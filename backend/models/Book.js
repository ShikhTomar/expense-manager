const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  issuedTo: { type: String },
  status: { type: String, default: "available" }, // available / issued
  issueDate: { type: Date },
  returnDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);