import express from 'express';
import connectDB from './config/db.js';
import productRoute from './routes/productRoutes.js';
import { errorHandler, notFound } from './middlewear/errorMiddlewear.js'

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();// connect to mongoDB
const app = express();

app.get('/', (req, res) => {
    res.send('api is running ...')
})

app.use('/api/products', productRoute)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})