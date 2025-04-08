import asyncHandler from './../middlewear/asyncHandler.js';
import USER from '../models/userModel.js';
import generateToken from '../Utils/generatToken.js';
import User from '../models/userModel.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExit = await USER.findOne({ email });
    if (userExit) {
        res.status(400);
        throw new Error('User already exist')
    }
    const user = await USER.create({
        name,
        email,
        password
    })
    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await USER.findOne({ email })

    if (user && (await user.matchPassword(password))) {

        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // token: user.getSignedJwtToken()
        });
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

    // if (!user || !(await USER.matchPassword(password))) {
    //     return res.status(401).json({ message: 'Invalid email or password' });
    // }

})

// @desc    Logout a user / clear cocookie
// @route   POST /api/users/logout
// @access  private 
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json('Loggec out successfully ')
})

// @desc    get user profile
// @route   GET /api/users/profile
// @access  private 
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await USER.findOne(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  private 
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await USER.findOne(req.user._id);
    if (user) {

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

// @desc    get users
// @route   GET /api/users
// @access  private/admin 
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

// @desc    UPDATE users
// @route   put /api/users
// @access  private/admin 
const updateUsers = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.params.id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})
// @desc    get user by id
// @route   GET /api/users/:ID
// @access  private/admin 
const getUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

// @desc    delete user
// @route   DELETE /api/users/:ID
// @access  private/admin 
const deleteUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(404);
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({ _id: user._id })
        res.status(200).json({ message: 'User deleted successfully' });

    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, updateUsers, getUserByID, deleteUsers }