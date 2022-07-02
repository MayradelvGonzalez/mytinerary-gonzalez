import React , {useffect} from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import SignUp from './SignUp';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import usersActions from '../../redux/actions/usersActions';
import FacebookIcon from '@mui/icons-material/Facebook'; 
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleSignIn from '../googleLogin/GoogleSignIn';
import SnackBar from '../snackbar/Snackbar';

function SignIn (){
const dispatch = useDispatch();

const handleSubmit = (event) => {

event.preventDefault()

const userLoged = {
    email: event.target[0].value,
    password: event.target[1].value,
    from:"form-Signin"
};
dispatch(usersActions.signIn(userLoged))

}
return (
    <div className='"container-form'>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="redes-sociales">
    <FacebookIcon /><InstagramIcon /><GoogleIcon />
    </Form.Group>
         <Form.Group> <Form.Label>Email address</Form.Label>
         <Form.Control type="email" className="formInput" placeholder="email@web.com" /></Form.Group>
         <Form.Group className="mb-3" controlId="formBasicPassword">
         <Form.Label>Password</Form.Label>
         <Form.Control type="password" className="formInput" placeholder="Enter password" /></Form.Group>
         <GoogleSignIn />
         <Button variant="primary" type="submit" className="boton-form">
        Submit
      </Button>
      <SnackBar />
      <Form.Text>Do not have an account?<LinkRouter to={<SignUp />}>Sign up!</LinkRouter></Form.Text>
        </Form>
    </div>
);
}

export default SignIn 