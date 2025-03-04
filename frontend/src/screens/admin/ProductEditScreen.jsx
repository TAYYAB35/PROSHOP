import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../../slices/productApiSlice'

const ProductEditScreen = () => {

    const { productId } = useParams;
    const [data, { isLoading: loading }] = useUpdateProductMutation();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
    console.log(product);

    return (
        <div>ProductEditScreen</div>
    )
}

export default ProductEditScreen