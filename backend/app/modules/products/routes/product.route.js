const express = require('express');
const products = require('../controllers/productController');
const router = express.Router();

router.get("/list", products.getProducts)

module.exports = router;