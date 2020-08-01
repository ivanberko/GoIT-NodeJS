const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

// custom method for  mongoose
async function findContactByIdAndUpdate(contactId, params) {
  return this.findByIdAndUpdate(contactId, { $set: params }, { new: true });
}

contactSchema.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;
