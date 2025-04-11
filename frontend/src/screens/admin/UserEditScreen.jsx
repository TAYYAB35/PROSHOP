import React from 'react'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/userApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { use } from 'react'
import { toast } from 'react-toastify'


const UserEditScreen = () => {

  const { id: userId } = useParams();
  const navigate = useNavigate();
  
  const { data: user, isLoading, isError } = useGetUserDetailsQuery(userId);


  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);


  const submitHandler = async (e) => {
    e.preventDefault()
    const updatedUser = {
      _id: userId,
      name,
      email,
      isAdmin
    }

    console.log(updatedUser);
    
    const res = await updateUser(updatedUser);
    if (res.error) {
      toast.error(res.error?.message || res.error);
    }
    else {
      toast.success('User updated successfully');
      navigate('/admin/users');
    }

  }

  return (

    <>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? <Loader /> : isError ? <Message variant='danger'>{isError.message}</Message> : (
        <Form onSubmit={submitHandler}>

          <Form.Group controlId='name' className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='email' className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='isAdmin' className='mb-2'>
            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
          </Form.Group>
          <Button type='submit' variant='primary'>Update</Button>
        </Form>
      )}

    </>

  )
}

export default UserEditScreen