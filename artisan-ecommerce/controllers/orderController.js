const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place an order
exports.placeOrder = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Your cart is empty' });
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

        // Create a new order
        const order = new Order({
            user: userId,
            items: cart.items,
            totalAmount,
        });

        await order.save();
        await Cart.findOneAndDelete({ user: userId }); // Clear cart after placing order

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Unable to place order' });
    }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update order status' });
    }
};
