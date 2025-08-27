const express = require('express');
const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const router = express.Router();

// Route to add a product (Admin only)
router.post('/', addProduct);

// Route to get all products
router.get('/', getProducts);

// Route to get a single product by ID
router.get('/:id', getProductById);

// Route to update a product (Admin only)
router.put('/:id', updateProduct);

// Route to delete a product (Admin only)
router.delete('/:id', deleteProduct);

module.exports = router;
