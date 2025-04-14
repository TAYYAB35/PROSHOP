import express from 'express';
import { addOrderItems, updateOrderToDeliverd, getOrders, updateOrderToPayed, getOrderById, getMyOrder } from '../controllers/orderController.js';
import { protect, admin } from '../middlewear/authMiddlewear.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrder);
router.route('/:id').get(protect ,getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPayed);
router.route('/:id/deliverd').put(protect, admin, updateOrderToDeliverd);

export default router;