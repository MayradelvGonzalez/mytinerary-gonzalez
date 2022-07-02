import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch,useState } from 'react-redux';
import usersActions from '../../redux/actions/usersActions';
import FacebookIcon from '@mui/icons-material/Facebook'; 
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleSignUp from '../googleLogin/GoogleSignUp';


function SignUp() {
  
  const paises = [
    "unselected",
    "Argentina",
    "Alemania",
    "Brazil",
    "Canada",
    "Colombia",
    "Ecuador",
    "EE UU",
    "Italia",
    "Venezula",
    "Peru",
    "Puerto Rico",
  ];

  
const dispatch = useDispatch();

const handleSubmit = (event) => {

event.preventDefault()
console.log(event)

const userData = {
  fullName: event.target[0].value,
  email:event.target[1].value,
  country:event.target[2].value,
  password:event.target[3].value,
  photo:event.target[4].value,
  from:"form-Singup"
};
console.log(userData)
dispatch(usersActions.signUp(userData))
}

  return (
    <div className="container-form">
     <h2 className="tituloSignIn">Create your account</h2>
    <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label className="#">Full Name:</Form.Label>
      <Form.Control type="name" className="formInput" placeholder="Enter name" required/>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" className="formInput" placeholder="email@web.com" required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
<Form.Group > <label>Choose a country</label> <select
            
          >
            {paises.map((country, index) => (
              <option key={index} required>{country}</option>
            ))}
          </select></Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" className="formInput" placeholder="Enter password" required />
        <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      <Form.Group>
       <Form.Label className="#">Photo:</Form.Label>
      <Form.Control type="text" className="formInput" placeholder="URL image" required/></Form.Group>
      
       
      </Form.Group>
      <Form.Group className="redes-sociales">
        <GoogleSignUp />
    <FacebookIcon /><InstagramIcon /><GoogleIcon />
    </Form.Group>
      <Form.Text className="pregForm">Have an account?<a href="#">Log In</a></Form.Text>
      <Button type="reset" className="boton-form-reiniciar" id="limpiar" value="Reiniciar Formulario"  >
       Reset
      </Button>
  
      <Button variant="primary" type="submit" className="boton-form">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default SignUp