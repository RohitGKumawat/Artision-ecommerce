require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const paymentRoutes = require('./routes/payment');

const app = express();

const cors = require('cors');
app.use(express.json());
// Add this line to parse JSON bodies
app.use('/api/auth', authRoutes);



app.use('/api/cart', cartRoutes);

app.use('/api/products', productRoutes);


app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);



app.use(cors());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
