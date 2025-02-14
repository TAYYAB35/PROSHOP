import asyncHandler from './../middlewear/asyncHandler.js';
import Order from '../models/orderModel.js';
import generateToken from '../Utils/generatToken.js';

// @desc    Create a new order
// @route   POST /api/orders
// @access  private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (orderItems && orderItems.length == 0) {
        res.status(404);
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({ ...x, product: x._id, id: undefined })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})

// @desc    Get Logged in user orders
// @route   GET /api/order/mine
// @access  private
const getMyOrder = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);

})

// @desc    Get Logged BY ID
// @route   GET /api/order/:id
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user','name email');
    if (!order) {
        res.status(404);
        throw new Error('Resource not found')
    } else {
        res.status(200).json(order);
    }
})

// @desc    Update Order to payed
// @route   PUT /api/order/:id/pay
// @access  private
const updateOrderToPayed = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAT = Date.now();
        order.paymentResult= {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
         
        res.status(404);
        throw new Error('Order not found')
    }

})

// @desc    Update Order to Deliverd
// @route   GET /api/order/:id/deliverd
// @access  private/admin
const updateOrderToDeliverd = asyncHandler(async (req, res) => {
    res.json('update Order To Deliverd')
})

// @desc    GET All Orders
// @route   GET /api/orders
// @access  private/admin
const getOrders = asyncHandler(async (req, res) => {
    res.json('get All Orders')
})


export { addOrderItems, updateOrderToDeliverd, getOrders, updateOrderToPayed, getOrderById, getMyOrder }