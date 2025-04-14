import React from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice'
import { Link, useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {

    const { pageNumber } = useParams()

    const { data, isLoading, isError, refetch } = useGetProductsQuery({ pageNumber });
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProd, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to create this product')) {
            try {
                await deleteProd(id);
                refetch();
                toast.success('Product deleted successfully');
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const createProductHandler = async (id) => {
        if (window.confirm('Are you sure you want to create this product')) {
            try {
                let product = await createProduct();
                refetch();
                toast.success('Product created successfully');
            } catch (error) {
                toast.error(error);
            }
        }
    }

    return (
        <>
            <Row className='align-items-center' >
                <Col>
                    <h1>Add Product</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingCreate && <Loader />}
            {isLoading ? <Loader /> :
                isError ? <Message variant='danger'>{isError.message}</Message> : (
                    <>
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.products.map(product => (
                                    <tr key={product._id} >
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <Link to={`/admin/product/${product._id}/edit`}>
                                                <Button className='btn-sm mx-2' variant='light' >
                                                    <FaEdit />
                                                </Button>
                                            </Link>
                                            <Button className='btn-sm' variant='danger' >
                                                <FaTrash style={{ color: "white" }} onClick={() => deleteProduct(product._id)} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
                    </>
                )}
        </>
    )
}

export default ProductListScreen