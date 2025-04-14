import asyncHandler from './../middlewear/asyncHandler.js';
import Product from '../models/productModel.js'

const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber || 1);


    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

    const count = await Product.countDocuments({ ...keyword }); //get all products
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Resource not found')
    }
    res.status(200).json(product)
})

// @desc    Get top rated products
// @route   POST /api/products/top
// @access  private 
const getTopProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({ rating: { $gte: 4.5 } }).sort({ rating: -1 }).limit(3);
    if (!products) {
        res.status(404);
        throw new Error('Resource not found')
    }
    res.status(200).json(products)
})

// @desc    Create a new product
// @route   POST /api/products
// @access  private / admin
const creatProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: 'https://img.freepik.com/free-psd/luxury-podium-product-presentation-3d-render_47987-15165.jpg?t=st=1741080248~exp=1741083848~hmac=79572280b2d50cb66eddb2739882ac7f2ac50f141f4a2a92394c1687ecf28289&w=1800',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        rating: 0,
        description: 'Sample description',
    });
    const createdProducts = await product.save();
    res.status(201).json(createdProducts)
})

// @desc    update a product
// @route   PUT /api/products/:id
// @access  private / admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Resource not found')
    } else {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    }
})

// @desc    delete a product
// @route   delete /api/products/:id
// @access  private / admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Resource not found')
    } else {
        await product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product deleted successfully' });
    }
})

// @desc    review a product / crate a review
// @route   post /api/products/:id/reviews
// @access  private 
const creatProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Resource not found')
    } else {
        // review tb he add hona ha jb product k andar review ki array me user ka id nahi hoga

        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        // alreadyreview k matlab ha ka product ki reviews ki array ma user ki id pass ho gyi ha 
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added successfully' });


    }
})


export { getAllProducts, getProductById, creatProduct, updateProduct, deleteProduct, creatProductReview, getTopProduct }