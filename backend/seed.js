import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import connectDB from "./configs/db.js";
import Admin from "./models/Admin.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import Order from "./models/Order.js";
import Address from "./models/address.js";

const seedData = async () => {
    try {
        await connectDB();
        console.log("Database connected for seeding...");

        // Clear existing data
        await Admin.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});
        await Order.deleteMany({});
        await Address.deleteMany({});
        console.log("Existing data cleared.");

        // 1. Create Sellers (Admins)
        const sellers = [];
        const hashedPassword = await bcrypt.hash("password123", 10);

        for (let i = 1; i <= 5; i++) {
            sellers.push({
                name: `Seller ${i}`,
                email: `seller${i}@example.com`,
                password: hashedPassword,
                role: "seller_admin",
            });
        }
        const createdSellers = await Admin.insertMany(sellers);
        console.log(`${createdSellers.length} Sellers created.`);

        // 2. Create Users
        const users = [];
        for (let i = 1; i <= 5; i++) {
            users.push({
                name: `User ${i}`,
                email: `user${i}@example.com`,
                password: hashedPassword,
            });
        }
        const createdUsers = await User.insertMany(users);
        console.log(`${createdUsers.length} Users created.`);

        // 3. Create Addresses for Users
        const addresses = [];
        for (const user of createdUsers) {
            addresses.push({
                userId: user._id,
                firstName: user.name.split(" ")[0],
                lastName: user.name.split(" ")[1] || "Doe",
                email: user.email,
                street: "123 Main St",
                city: "New York",
                state: "NY",
                zipcode: 10001,
                country: "USA",
                phone: "1234567890"
            });
        }
        const createdAddresses = await Address.insertMany(addresses);
        console.log(`${createdAddresses.length} Addresses created.`);

        // 4. Create Products
        const products = [];
        const categories = ["Electronics", "Clothing", "Home", "Books", "Toys"];

        for (let i = 0; i < 40; i++) {
            const randomSeller = createdSellers[Math.floor(Math.random() * createdSellers.length)];
            products.push({
                name: `Product ${i + 1}`,
                description: [`This is a description for Product ${i + 1}`],
                price: Math.floor(Math.random() * 100) + 10,
                offerPrice: Math.floor(Math.random() * 90) + 5,
                image: ["https://cdn2.zohoecommerce.com/product-images/Dummy1.jpg/386590000002593099/600x600?storefront_domain=www.pareedhaan.in"],
                category: categories[Math.floor(Math.random() * categories.length)],
                inStock: true,
                admin_id: randomSeller._id,
            });
        }
        const createdProducts = await Product.insertMany(products);
        console.log(`${createdProducts.length} Products created.`);

        // 5. Create Orders
        const orders = [];
        for (let i = 0; i < 20; i++) {
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            const randomProduct = createdProducts[Math.floor(Math.random() * createdProducts.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            const userAddress = createdAddresses.find(addr => addr.userId.toString() === randomUser._id.toString());

            orders.push({
                userId: randomUser._id,
                items: [{
                    product: randomProduct._id,
                    quantity: quantity
                }],
                amount: randomProduct.offerPrice * quantity,
                address: userAddress._id,
                status: "Order Placed",
                paymentType: "COD",
                isPaid: false,
                sellerId: randomProduct.admin_id
            });
        }
        await Order.insertMany(orders);
        console.log(`${orders.length} Orders created.`);

        console.log("Seeding completed successfully!");
        process.exit();

    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
