//1.
//importing express for routing the the different routes that will come for user routes
import express from 'express';
import { isSellerAuth, logoutSeller, sellerLogin, registerSeller } from '../controllers/sellerController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

//2.
//router object
const sellerRouter = express.Router();


sellerRouter.post('/login', sellerLogin);
sellerRouter.post('/register', registerSeller);
sellerRouter.get('/is-auth', protect, admin, isSellerAuth);
sellerRouter.get('/logout', protect, admin, logoutSeller);


export default sellerRouter;