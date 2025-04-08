import React from 'react'
import { useGetUserQuery, useDeleteUserMutation } from './../../slices/userApiSlice'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserListScreen = () => {

    const { data: users, refetch, isLoading, isError } = useGetUserQuery();
    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async(id) => {
        if (window.confirm('Are you sure you want to delete this User')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('User deleted successfully');
            } catch (error) {
                toast.error(error);
            }
        }
    }
    return (
        <>
            <h1>Users</h1>
            {isLoading ? <Loader /> :
                isError ? <Message variant='danger'>{isError.message}</Message> : (
                    <>
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} >
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td> <a href={`mailto:${user.email}`}>{user.email}</a></td>
                                        <td>{user.isAdmin ?
                                            <FaCheck style={{ color: 'green' }} />
                                            : <FaTimes style={{ color: 'Red' }} />}</td>
                                        <td>
                                            <Link to={`/admin/user/${user._id}/edit`}>
                                                <Button className='btn-sm mx-2' variant='light' >
                                                    <FaEdit />
                                                </Button>
                                            </Link>
                                            <Button className='btn-sm' variant='danger' >
                                                <FaTrash style={{ color: "white" }} onClick={() => deleteHandler(user._id)} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
        </>
    )
}

export default UserListScreen