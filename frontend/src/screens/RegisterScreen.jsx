import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'

const LoginScreen = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    React.useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch action to log in user
        if (password !== confirmPassword) {
            toast.error('Password do not match');
            return;
        } else {
            try {
                const res = await Register({ name, email, password }).unwrap();
                // set user info in state and local storage
                dispatch(setCredentials(res));
                toast.success('Register Successfully');
                navigate(redirect);
            } catch (error) {
                toast.error(error?.data?.message || error?.error);
            }
        }

    }

    return (
        <div>
            <FormContainer>
                <h1 className="text-center" >Sign Up</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName ">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className='my-3'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className='my-3' >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className='my-3' >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-2 w-100' disabled={isLoading}>
                        Register
                    </Button>
                    {isLoading && <Loader />}
                </Form>
                <Row className='py-3'>
                    <Col>
                        Already Have Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    )
}

export default LoginScreen