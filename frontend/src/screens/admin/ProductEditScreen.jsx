import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productApiSlice'
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProductEditScreen = () => {

    const navigate = useNavigate();
    const params = useParams();
    let id = params.id;
    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(id);


    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }
        debugger
        const res = await updateProduct(updatedProduct);
        if (res.error) {
            toast.error(res.error.data.message);
        } else {
            toast.success('Product updated successfully');
            navigate('/admin/productlist');
        }

    }

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await uploadImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error('Error while uploading image' || res.error.data.message || error.error);
        }
    }

    return (
        <>
            <Link to="/admin/productlist" className='btn btn-light my-3' >
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='mb-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='price' className='mb-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        {/* placeholder for image */}
                        <Form.Group controlId='image' className='mb-2'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" value={image} placeholder='Enter image URl' onChange={(e) => setImage(e.target.value)} />
                            <Form.Control type="file" label='Choose File' onChange={uploadFileHandler} />

                        </Form.Group>
                        <Form.Group controlId='brand' className='mb-2'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='category' className='mb-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='countInStock' className='mb-2'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='description' className='mb-2'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as='textarea' rows={3} placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update Product</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen