import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import usersActions from '../../redux/actions/usersActions';

function SignUpUsers() {

const dispatch = useDispatch();
const handleSubmit = (event) => {
event.preventDefault()
console.log(event.target[0].value)
const userData = {
  fullName: event.target[0].value,
  email:event.target[1].value,
  password:event.target[2].value,
  from:"form-Singup"
};
dispatch(usersActions.singUp(userData))
}
  return (
    <div className="container-form">
      
    <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Full Name:</Form.Label>
      <Form.Control type="name" placeholder="Enter name" />
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="email@web.com" id="password" />
        <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Control placeholder="Choose your country"><Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select></Form.Control>
      </Form.Group>
      </Form.Group>
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

export default SignUpUsers