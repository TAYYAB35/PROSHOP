import express from 'express';
import { getAllProducts, getProductById, creatProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middlewear/authMiddlewear.js'
const router = express.Router();


router.route('/').get(getAllProducts).post(protect, admin, creatProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

export default router;