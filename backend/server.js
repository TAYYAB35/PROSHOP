import express from 'express';
import connectDB from './config/db.js';
import productRoute from './routes/productRoutes.js';
import userRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middlewear/errorMiddlewear.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();// connect to mongoDB
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());// in order to get the cookie from the request header

app.get('/', (req, res) => {
    res.send('api is running ...')
})

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => res.send({ clientID: process.env.PAYPAL_CLIENT_ID }))

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})