import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: Array,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },
    offerPrice: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }
}, { timestamps: true });

// Indexes for performance
productSchema.index({ category: 1, price: 1 });
productSchema.index({ admin_id: 1 });

const Product = mongoose.model.product || mongoose.model('product', productSchema);


export default Product;