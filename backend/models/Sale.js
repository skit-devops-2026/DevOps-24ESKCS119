const mongoose = require('mongoose');
const SaleSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: String, required: true }
});
module.exports = mongoose.model('Sale', SaleSchema);
