const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: String,
    company: String
});
module.exports = mongoose.model('Supplier', SupplierSchema);
