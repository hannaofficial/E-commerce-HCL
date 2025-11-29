import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['super_admin', 'seller_admin'],
        default: 'seller_admin'
    },
    // Track uploads and order history can be done via virtuals or direct queries, 
    // but we can store references if needed. For scalability, direct queries on Product/Order with admin_id are better.
}, { minimize: false, timestamps: true });

const Admin = mongoose.model.admin || mongoose.model('admin', adminSchema);

export default Admin;
