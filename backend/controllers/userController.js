import asyncHandler from './../middlewear/asyncHandler.js';
import Product from '../models/productModel.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    res.json('Add User')
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
    res.json('Auth User')
})

// @desc    Logout a user / clear cocookie
// @route   POST /api/users/logout
// @access  private 
const logoutUser = asyncHandler(async (req, res) => {
    res.json('Logout')
})

// @desc    get user profile
// @route   GET /api/users/profile
// @access  private 
const getUserProfile = asyncHandler(async (req, res) => {
    res.json('info')
})

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  private 
const updateUserProfile = asyncHandler(async (req, res) => {
    res.json('update info')
})

// @desc    get users
// @route   GET /api/users
// @access  private/admin 
// const getUsers = asyncHandler(async (req, res) => {
//     res.json('getUsers')
// })

// @desc    UPDATE users
// @route   put /api/users
// @access  private/admin 
const getUsers = asyncHandler(async (req, res) => {
    res.json('getUsers')
})

// @desc    get user by id
// @route   GET /api/users/:ID
// @access  private/admin 
const getUserByID = asyncHandler(async (req, res) => {
    res.json('getUsers by ID')
})

// @desc    delete user
// @route   DELETE /api/users/:ID
// @access  private/admin 
const deleteUsers = asyncHandler(async (req, res) => {
    res.json('delete Users')
})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile,getUsers }