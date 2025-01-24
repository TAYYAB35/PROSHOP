import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile,updateUserProfile } from '../controllers/userController.js';
const router = express.Router();


router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(getUserProfile);
router.route('/profile').put(updateUserProfile);


export default router;