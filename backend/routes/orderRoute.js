import express from 'express'

import authUser from '../middlewares/authUser.js'
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', protect, admin, getAllOrders);


export default orderRouter;

