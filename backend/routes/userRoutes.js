import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, updateUsers, getUserByID, deleteUsers} from '../controllers/userController.js';
const router = express.Router();


router.route('/').post(registerUser).get(getUsers);
router.post('/logout' ,logoutUser);
router.post('/login',authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').get(getUserByID).delete(deleteUsers).put(updateUsers);


export default router;