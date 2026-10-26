const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Supplier = require('../models/Supplier');
const Sale = require('../models/Sale');

// --- CUSTOMERS APIs ---
router.get('/customers', async (req, res) => res.json(await Customer.find()));
router.post('/customers', async (req, res) => res.json(await new Customer(req.body).save()));

// --- SUPPLIERS APIs ---
router.get('/suppliers', async (req, res) => res.json(await Supplier.find()));
router.post('/suppliers', async (req, res) => res.json(await new Supplier(req.body).save()));

// --- SALES APIs ---
router.get('/sales', async (req, res) => res.json(await Sale.find()));
router.post('/sales', async (req, res) => res.json(await new Sale(req.body).save()));

module.exports = router;
