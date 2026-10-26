const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: String,
    email: String,
    purchases: { type: Number, default: 0 }
});
module.exports = mongoose.model('Customer', CustomerSchema);
