import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, updateUsers, getUserByID, deleteUsers } from '../controllers/userController.js';
import { protect, admin } from '../middlewear/authMiddlewear.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').get(protect, admin, getUserByID).delete(protect, admin, deleteUsers).put(protect, admin, updateUsers);


export default router;