import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import usersActions from '../../redux/usersActions';

function SignUp() {

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
dispatch(usersActions.singUpUser(userData))
}
  return (
    <div className="container-form">
      
    <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label onChange={event => setUserName(event.target.value)}>Name:</Form.Label>
      <Form.Control type="name" placeholder="Enter name" />
        <Form.Label onChange={event => setUserEmail(event.target.value)}>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label onChange={event => setUserPassword(event.target.value)}>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
        <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </Form.Text>
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

export default SignUp