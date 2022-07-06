import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import usersActions from '../../redux/actions/usersActions';
import GoogleSignIn from '../googleLogin/GoogleSignIn';
import { useNavigate } from 'react-router-dom';
import SnackBar from '../snackbar/Snackbar';

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {

        event.preventDefault()

        const userLoged = {
            email: event.target[0].value,
            password: event.target[1].value,
            from: "form-SignIn"
        };

        const res = await dispatch(usersActions.signIn(userLoged))
        if (res.data.success) {
            navigate('/')
        }
        console.log(userLoged)
    }
    return (
        <div className='container-formSignIn'>
            <h2 className="tituloSignIn">Welcome back!</h2>
            <Form onSubmit={handleSubmit} className="formSignIn">
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" className="formInput" placeholder="email@web.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className="formInput" placeholder="Enter password" />
                </Form.Group>
                <GoogleSignIn />
                <Button variant="primary" type="submit" className="botonSignIn">
                    Submit
                </Button>
                <SnackBar />
                <Form.Text>Do not have an account?<LinkRouter to='/signup'>Sign up!</LinkRouter></Form.Text>
            </Form>
        </div>
    );
}

export default SignIn 