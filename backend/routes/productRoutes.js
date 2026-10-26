const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// सारे प्रोडक्ट्स देखने के लिए
router.get('/', async (req, res) => {
    try { res.json(await Product.find()); } 
    catch (err) { res.status(500).json({ error: err.message }); }
});

// नया प्रोडक्ट जोड़ने के लिए
router.post('/add', async (req, res) => {
    try { res.status(201).json(await new Product(req.body).save()); } 
    catch (err) { res.status(400).json({ error: err.message }); }
});
module.exports = router;
