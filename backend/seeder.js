const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/products');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);
//  function to seed the data
const seedData = async () => {
    try {
        //Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
        // Create a default admin user
        const createdUser = await User.create({
            name: 'Admin User',
            email: "admin@example.com",
            password: "123456",
            role: 'admin',
        });
        // Assigning the default userID to each product
        const userID = createdUser._id;
        // Create products with the default user ID
        const sampleProducts = products.map((product) => {
            return {...product, user: userID};
        });
        // Insert products into the database
        await Product.insertMany(sampleProducts);
        console.log('Product data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};
seedData();