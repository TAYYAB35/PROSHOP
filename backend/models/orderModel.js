import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    orderItems: [
        {
            name: { typr: String, require: true },
            qty: { typr: String, require: true },
            image: { typr: String, require: true },
            price: { typr: String, require: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "Product"
            }
        }
    ],
    shippingAddress: {
        address: { typr: String, require: true },
        city: { typr: String, require: true },
        postalCode: { typr: String, require: true },
        country: { typr: String, require: true },
    },
    paymentMethod: {
        type: String,
        require: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updated_time: { type: String },
        email_address: { type: String },
    },
    itemsPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        require: true,
        default: false
    },
    paidAT: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        require: true,
        default: false
    },
    deleviredAT: {
        type: Date,
    },
}, {
    timeseries: true
})

const Order = mongoose.model("Order", orderSchema);

export default Order