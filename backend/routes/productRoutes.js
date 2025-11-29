//1.
//importing express for routing the the different routes that will come for user routes
import express from 'express';
import { upload } from '../configs/multer.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { addProduct, changeStock, productById, productsList, sellerProducts } from '../controllers/productsController.js';


const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), protect, admin, addProduct);
productRouter.get('/list', productsList);
productRouter.get('/my-products', protect, admin, sellerProducts);
productRouter.get('/id', productById);
productRouter.post('/stock', protect, admin, changeStock);


export default productRouter;